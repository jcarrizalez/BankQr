import React, {useEffect, useState} from 'react';
import {View, Text, toast} from '../lib/react-native';
import { defaultNavigationOptions } from '../lib/navigation';
import {SMS, filter} from '../lib/sms-android';
import {QRCode} from '../lib/qrcode-svg';
import {stringFormat, uuidv4, parse, stringify, formated} from '../functions';
import {encrypt} from '../lib/crypto-js';
import Bottom from './Bottom';
import {Banner} from './Firebase';
import styles from '../styles';
import {redux} from '../store';

const css = styles('ShowCodeQr');
var ids_sms = [];

const ShowCodeQr = ({navigation}) => {

  const size = 320;
  const [amount] = useState(redux.get('amount'));
  const [link] = useState(redux.get('link'));
  const [collector] = useState(redux.get('collector')||{});
  const [operation, setOperation] = useState(null);

  var value;
  var string;
  string= stringFormat({
    ...collector,amount
  });
  value = encodeURI(link+(encrypt(stringify(string))));

  const onCancel = () => {
    redux.push('amount', '0');
    navigation.goBack();
  };

  useEffect(() => {
    SMS.list(stringify(filter),
      (fail) => toast('Error en Lectura de SMS'),
      (count, smsList) => {
        ids_sms = parse(smsList).map( object => object._id);
      }
    );
    
    var timer = 0;
    function read(){
      timer = setTimeout(() => {
        SMS.list(stringify(filter),
          (fail) => null,
          (count, smsList) => {
            parse(smsList).forEach( object => {

              //if(object._id===166){
              if(!ids_sms.includes(object._id)){
                ids_sms.push(object._id);
                var message = object.body.replace(/[.]+/g, "");
                if(message.indexOf(amount)!==-1){
                //if(message.indexOf('1180000')!==-1){
                  let opet = message.split('#');
                  opet = opet[1]??'';
                  opet = opet.split(' ');
                  
                  var story = redux.get('story');
                  story.push({
                    id:uuidv4(),
                    type:'r-qr',
                    bank: collector.bank,
                    headline: collector.headline,
                    operation: opet[0],
                    amount: amount
                  });
                  redux.push('story',story, true);

                  toast('Pago Procesado');

                  setOperation(opet[0]);
                  /*
                  SMS.delete(object._id,
                    (fail) => null,
                    (success) => null,
                  );
                  */
                }
              }
            });
          }
        );
        read();
      } , 2000);
    }
    read();
    return ()=> {
      clearTimeout(timer);
      let score = redux.get('score');
      score = (score<1)? 1 : score;
      redux.push('score', (score - 1), true);
    }
  },[amount, collector]);

  if(operation){
    return (
      <View style={css.content}>
        <View style={css.firebase}>
          <Banner />
        </View>
        <View style={css.error}>
          <Text style={css.operacion1}>#{operation}</Text>
          <Text style={css.operacion0}>operación</Text>
        </View>
        <Bottom onPress={onCancel}>ATRAS</Bottom>
      </View>
    );
  }

  return (
    <View style={css.show_code_qr}>
      <View style={css.firebase}>
        <Banner />
      </View>
      <View style={css.code_qr}>
        <View style={css.img}>
          <QRCode size={size} color='black' value={value}/>
        </View>
      </View>
      <View style={css.info}>
        <Text style={css.amount}>{formated(amount)} Bs</Text>
        <Text style={css.text}>{collector.bank}</Text>
      </View>
        <Bottom onPress={onCancel}>CANCELAR PAGO</Bottom>
    </View>
  );
}

export default {
  screen: ShowCodeQr,
  path: 'ShowCodeQr/:name',
  navigationOptions: ({ navigation }) => ({
    ...defaultNavigationOptions,
      title: 'Esperando Capture Qr',
  }),
}