import React, {useEffect, useState} from 'react';
import {View, Text, Alert, SafeAreaView, ScrollView, toast} from '../lib/react-native';
import {SMS, filter} from '../lib/sms-android';
import {isLine, uuidv4, parse, stringify, formated} from '../functions';
import {decrypt} from '../lib/crypto-js';
import { defaultNavigationOptions } from '../lib/navigation';
import {redux, banks} from '../store';
import Bottom from './Bottom';
import {Banner} from './Firebase';
import styles from '../styles';

const css = styles('SendPaymentByQr');
var is_load = true;
var state = {};
var ids_sms = [];

const onDecode= (data, link) =>{
  var decode;
  try {
    decode = decodeURI(data);
    decode = decode.replace(link,'');
    decode = parse(decrypt(decode));
   //orden 'Banesco|0102|04245556677|15650075|Juan Carrizalez';
  }
  catch (error) {
    decode = '';  
  }
  return decode
}

function SendPaymentByQr({navigation})
{
  const [update, setUpdate] = useState(null);

  if(is_load){
    state.id = uuidv4();
    let {payer, link, isremote, route} = redux.all();
    state.link = link; 
    state.isremote = isremote; 
    state.payer = payer; 
    is_load = false;
    setUpdate(new Date);
  }

  const [password_temp, setPasswordTemp] = useState(false);
  const [isremote] = useState(redux.get('isremote'));
  const [decode] = useState(onDecode(redux.get('route').data, redux.get('link')));
  
  const [operation, setOperation] = useState(null);

  const payer = state.payer;
  
  const array   = decode.split('|');

  var [
    bank_id,
    trade,
    type,
    phone,
    doc_receptor_identifier, 
    doc_receptor, 
    name, 
    amount
  ] = array;
  const bank_receptor = banks.find(item=>item.id===bank_id);
  const bank_emisor = banks.find(item=>item.id===payer.bank_id);

  const pagar         = 'PAGAR';
  const pago_enviado  = 'MENU';

  var [bottom, setBottom] = useState(pagar);

  const line_st = {line:css.line, line_bar:css.line_bar, line_text:css.line_text};

  //console.log(bank_emisor.password_temp)
  //useEffect(() => {password_temp, setPasswordTemp

  var line = isLine(phone);
  var comand  = 'number_sms|'+bank_emisor.path;
  var conpath = bank_emisor.condition.path??[];
  var consms = bank_emisor.condition.sms??[];
  conpath.forEach(item=>{
    if(item.type==='replace'){
      let condition = item.condition.split('===');
      let action = item.action.split(',');
      if(condition[0]==='trade' && condition[1]==='true' && trade==='true'){
        comand = comand.replace(action[0], action[1]);
      }
    }
  });
  consms.forEach(item=>{
    if(item.type==='replace'){
      let condition = item.condition.split('===');
      let action = item.action.split(',');
      if(condition[0]==='trade' && condition[1]==='true' && trade==='true'){
        comand = comand.replace(action[0], action[1]);
      }
    }
  });
  comand  = comand
    .replace('doc_emisor_identifier', payer.doc_emisor_identifier)
    .replace('doc_emisor', payer.doc_emisor)
    .replace('doc_receptor_identifier', doc_receptor_identifier)
    .replace('doc_receptor', doc_receptor)
    .replace('amount', amount)
    .replace('number_sms', bank_emisor.number_sms)
    .replace('word', bank_emisor.word)
    .replace('number', bank_receptor.number)
    .replace('type', payer.type)
    .replace('phone',phone.split('').map((item,key)=> (key===0)?'':item).join('') )
  
  //console.log(comand)
/*
  {
    type:'replace',
    condition:'doc_receptor_identifier===J',
    action:'word,PAC'
  }
  console.log(number_sms)
*/

  const sendSMS = () => {

      num_document = payer.use_identifier? (payer.identifier+num_document) : num_document;
      
      var comand  = payer.path_comand
        .replace('prefix', payer.prefix)
        .replace('number', bank_account)
        .replace('document', num_document)
        .replace('phone', telephone)
        .replace('amount', amount+',00');

      SMS.autoSend(payer.number_sms, comand,
      (fail) => {
        setBottom(pagar);
        toast('Error: '+fail);
      },
      (success) => {
        setBottom(pago_enviado);
        var story = redux.get('story');
        story.push({
          id:state.id,
          type:state.isremote?'p-rt':'p-qr',
          bank: payer.bank,
          headline: payer.headline,
          operation: undefined,
          amount: amount
        });
        redux.push('story',story, true);

        toast("Pago Enviado !!!");
      }
    );
  }
  const onBack = () => navigation.goBack();

  const onPress = () => {

    if(bottom===pago_enviado){
      navigation.navigate('Home');
      return null;
    }
    setBottom('CONFIRMAR ENVIO');
    Alert.alert("Confirmas enviar?", formated(amount)+' Bs',
      [
        {
          text: "Cancel",
          onPress: () => {
            setBottom(pagar);
          },
          style: "cancel"
        },
        { text: "Enviar", onPress: () => {
          setBottom(true);
          sendSMS();
          }}
      ]
    );
  };

  const onPasswordTemp=()=>{
    /*
    SMS.autoSend(payer.number_sms, 'SCT',
      (fail) => {
        setBottom(pagar);
        toast('Error: '+fail);
      },
      (success) => {
        setBottom(pago_enviado);
        var story = redux.get('story');
        story.push({
          id:state.id,
          type:state.isremote?'p-rt':'p-qr',
          bank: payer.bank,
          headline: payer.headline,
          operation: undefined,
          amount: amount
        });
        redux.push('story',story, true);

        toast("Pago Enviado !!!");
      }
    */
  }

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
              //if(object._id===172){
              if(!ids_sms.includes(object._id)){
                ids_sms.push(object._id);
                var message = object.body.replace(/[.]+/g, "");
                if(message.indexOf(telephone)!==-1 && message.indexOf(amount)!==-1){
                //if(message.indexOf('04243241814')!==-1 && message.indexOf('1180000')!==-1){
                  let opet = message.split('#');
                  opet = opet[1]??'';
                  opet = opet.split(' ');
                  
                  var story = redux.get('story');
                  story = story.map(item=>{
                    if(item.id===state.id){
                      item.operation = opet[0];
                    }
                    return item;
                  })
                  redux.push('story',story, true);
                  
                  setOperation(opet[0]);

                  toast('Pago Procesado');
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

      redux.push('isremote', false);
      redux.push('admobRewarded', true);
    }

  }, []);

  if(operation){
    return (
      <View style={css.content}>
        <View style={css.error}>
          <Text style={css.operacion1}>#{operation}</Text>
          <Text style={css.operacion0}>operación</Text>
        </View>
        <Bottom onPress={()=>navigation.navigate('Home')}>MENU</Bottom>
      </View>
    );
  }

  if(!bank_receptor || !bank_emisor || array.length!==8){
    return (
      <View style={css.content}>
        <View style={css.error}>
          <Text style={css.error_text}>Codigo Qr :(</Text>
          <Text style={css.error_text}>no identificado!</Text>
        </View>
        <Bottom onPress={onBack}>CANCELAR</Bottom>
      </View>
    );
  }

  return (
  <SafeAreaView style={css.content}>
    <ScrollView style={css.scrollView}>
    <View>
    <Text style={css.textTitle}>Envia:</Text>
    <View style={css.caja}>
      <Text style={css.bank}>{payer.name}</Text>
      <Text style={css.name}>nombre: {payer.headline}</Text>
      {/*<Text style={css.alias}>alias: {payer.alias}</Text>*/}
    </View>

    <Text style={css.textTitle}>Recibe:</Text>
    <View style={css.caja}>
      <Text style={css.bank}>{bank_receptor.name}</Text>
      <Text style={css.name}>nombre: {name}</Text>
      {/*<Text style={css.alias}>alias: {alias}</Text>*/}
    </View>

    <Text style={css.textTitle}>Monto:</Text>
    <View style={css.caja}>
      <View style={css.caja_amount}>
        <Text style={css.amount}>{formated(amount)+' Bs'}</Text>
      </View>
    </View>
    {bank_emisor.password_temp?
      <View style={css.banner}>
        <View style={{height:20}} />
        <Bottom onPress={onPasswordTemp}>CLAVE TEMPORAL</Bottom>
        <View style={{height:20}} />
      </View>
      :null}
    <View style={css.banner}>
      <Banner size='lansp'/>
    </View>

  </View>
  </ScrollView>
    <Bottom onCancel={bottom===pagar?onBack:null} onPress={onPress}>{bottom}</Bottom>
  </SafeAreaView>
  );
}

const Line = ({line, line_bar, line_text, children}) =>
  <View style={line}>
    <View style={line_bar} />
    <Text style={line_text}>{children}</Text>
    <View style={line_bar} />
  </View>;

export default {
  screen: SendPaymentByQr,
  path: 'SendPaymentByQr/:name',
  navigationOptions: ({ navigation }) => ({
    ...defaultNavigationOptions,
      title: 'Emitir Pago',
  }),
}
