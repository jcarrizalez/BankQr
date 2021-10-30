import React, {useEffect, useState} from 'react';
import {View, Button, Text, Alert, SafeAreaView, ScrollView, TextInput, toast} from '../lib/react-native';
import {SMS, filter} from '../lib/sms-android';
import {isLine, uuidv4, parse, stringify, formated} from '../functions';
import {decrypt} from '../lib/crypto-js';
import { defaultNavigationOptions } from '../lib/navigation';
import {redux, banks, number_test } from '../store';
import Bottom from './Bottom';
import {Banner} from './Firebase';
import styles from '../styles';

var dev = __DEV__ ? true : false;
dev = true;

const pagar         = 'PAGAR';
const pago_enviado  = 'MENU';
const css = styles('SendPaymentByQr');
var is_load = true;
var state = {};
var ids_sms = [];

const onDecode= (data, link) =>{
  var decode;
  try {
    decode = parse(decrypt(decodeURI(data).replace(link,'')));
  }
  catch (error) {
    decode = '';  
  }
  return decode.split('|')
}

const onComand = (state)=>{
  var {bank_emisor, bank_receptor, payer, trade, line, phone} = state;
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
      else if(condition[0]==='movilnet' && condition[1]==='true' && line==='movilnet'){
        comand = comand.replace(action[0], action[1]);
      }
    }
  });
  comand  = comand
    .replace('doc_emisor_identifier', payer.doc_emisor_identifier)
    .replace('doc_emisor', payer.doc_emisor)
    .replace('doc_receptor_identifier', state.doc_receptor_identifier)
    .replace('doc_receptor', state.doc_receptor)
    .replace('amount', state.amount)
    .replace('coordinates', state.coordinates)
    .replace('password_temp', state.password_temp_string)
    .replace('number_sms', bank_emisor.number_sms)
    .replace('word', bank_emisor.word)
    .replace('number', bank_receptor.number)
    .replace('type', payer.type)
    .replace('phone',phone.split('').map((item,key)=> (key===0)?'':item).join('') )
  return comand.split('|');
}

function SendPaymentByQr({navigation})
{
  const [update, setUpdate] = useState(null);
  const [password_temp, setPasswordTemp] = useState(false);
  const [rdx] = useState(redux.all());
  var [bottom, setBottom] = useState(pagar);

  if(is_load){
    let {payer, link, route, isremote } = redux.all();

    
    var [bank_id, trade, type, phone, doc_receptor_identifier, doc_receptor, name, amount] = onDecode(route.data, link);

    state = {
      payer,
      isremote,
      bank_id, trade, type, phone, doc_receptor_identifier, doc_receptor, name, amount,
      operation:null,
      coordinates:'',
      password_temp:null,
      password_temp_string:'',
      bank_receptor:banks.find(item=>item.id===bank_id), 
      bank_emisor:banks.find(item=>item.id===payer.bank_id), 
      id:uuidv4(),
      line:isLine(phone)
    };

    if(state.bank_emisor.coordinates??null){
      let coordinates = payer.coordinates??[''];
      if(coordinates.length>0){
        const random = Math.floor(Math.random() * coordinates.length);
        state.coordinates = coordinates[random];
      }
    }
    is_load = false;
    setUpdate(new Date);  
  }
  var [number_sms, comand]  = onComand(state);
  
  const sendSMS = () => {

      var number = dev ? number_test : number_sms;

      SMS.autoSend(number, comand,
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
          bank: payer.name,
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

    if(bank_emisor.password_temp && state.password_temp_string===''){
      toast('Se Necesita una Clave Temporal');
      return null;
    }
    else if(bank_emisor.password_temp && state.password_temp_string.length<4){
      toast('Clave Temporal minimo 4');
      return null;
    }
    else if(bank_emisor.coordinates && state.coordinates===''){
      toast('Indica una Clave de Coordenadas');
      return null;
    }
    else if(bank_emisor.coordinates && state.coordinates.length<2){
      toast('Clave de Coordenadas minimo 2');
      return null;
    }
    else if(bottom===pago_enviado){
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

    const aler= () => Alert.alert("", 'Ya se envio un SMS con la solicitud',[
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      }
    ]);

    const sms= () => {
      var number = dev ? number_test : number_sms;

      SMS.autoSend(number, 'SCT',
      (fail) => {
        //state.password_temp=true;
        toast('Error: '+fail);
        setUpdate(new Date);
      },
      (success) => {
        state.password_temp=true;
        setUpdate(new Date);  
        /*
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
        */
        toast("Clave Temporal Solicitida");
      }
    )};

    if(!state.password_temp){
      sms();
    }
    else{
      aler();
    }
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
                //console.log('message',message)
                //console.log('phone',state.phone.substring(1))
                //console.log('amount',state.amount)
                if(message.indexOf('temporal')!==-1){
                  message = message.split(':');
                  message = message[1]??null;
                  state.password_temp_string = message.trim();
                  setUpdate(new Date());
                  toast('Clave Temporal recibida');
                }
                else if(message.indexOf(state.phone.substring(1))!==-1 && message.indexOf(state.amount)!==-1){
                //if(message.indexOf('04243241814')!==-1 && message.indexOf('1180000')!==-1){
                  let opet = message.split('#');
                  opet = opet[1]??'';
                  opet = opet.split(' ');

                  var story = redux.get('story');
                  story = story.map(item=> {
                    if(item.id===state.id){
                      item.operation = opet[0];
                    }
                    return item;
                  })
                  redux.push('story',story, true);
                  state.operation = opet[0];
                  setUpdate(new Date());

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

  useEffect(() => {
    return () => {
      is_load = true;
      state = {};
    }
  },[]);

  var {name, operation, bank_receptor, bank_emisor, payer, amount} = state;

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

  if(!bank_receptor || !bank_emisor || !amount){
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

  return(
     <SafeAreaView style={css.content}>
      <ScrollView style={css.scrollView}>
        <View>
          <View style={css.area}>
            <Text style={{fontSize:45,fontWeight:'normal'}}>{formated(amount)+' Bs'}</Text>
          </View>
          <View style={css.area}>
            <Text style={css.title}>Envia</Text>
            <View style={css.inputColumn}>
              <Text style={css.textInput}>{payer.name}</Text>
              <Text style={css.textTitle}>Banco:</Text>
              <Text style={css.textInput}>{payer.headline}</Text>
              <Text style={css.textTitle}>Titular:</Text>
            </View>
          </View>
          <View style={css.area}>
            <Text style={css.title}>Recibe</Text>
            <View style={css.inputColumn}>
              <Text style={css.textInput}>{bank_receptor.name}</Text>
              <Text style={css.textTitle}>Banco:</Text>
              <Text style={css.textInput}>{name}</Text>
              <Text style={css.textTitle}>Titular:</Text>
            </View>
          </View>
          {bank_emisor.password_temp?
            <View style={css.area}>
            <Text style={css.title}>Clave Temporal</Text>
            <View style={css.inputRow}>
              <TextInput
                style={{...css.textInput, marginLeft:10, width:'60%', borderTopRightRadius:0}}
                placeholder={state.password_temp?'Esperando SMS...':'Tengo una Clave'}
                value={state.password_temp_string}
                onChangeText={value=>{
                  state.password_temp_string=value;
                  setUpdate(new Date);
                }}
                maxLength={10}
              />
              <Button disabled={(state.password_temp || state.password_temp_string!=='')} color="orange" style={{width:'40%'}} onPress={onPasswordTemp} title='SOLICITAR'></Button>
            </View>
            <Text style={css.textTitle}></Text>
          </View>
          :null}
          {bank_emisor.coordinates?
            <View style={css.area}>
            <Text style={css.title}>Clave de Coordenadas</Text>
              <View style={css.inputColumn}>
                <TextInput
                  style={css.textInput}
                  placeholder='Indica un Coordenada'
                  value={state.coordinates}
                  onChangeText={value=>{
                    state.coordinates=value;
                    setUpdate(new Date);
                  }}
                  maxLength={10}
                />
                <Text style={css.textTitle}>Coordenada:</Text>
              </View>
            </View>
          :null}

        </View>
        <View style={css.simple}></View>
        <View style={css.banner}>
          <Banner size='lansp'/>
        </View>
        <View style={css.simple}></View>
      </ScrollView>
      <Bottom onCancel={bottom===pagar?onBack:null} onPress={onPress}>{bottom}</Bottom>
    </SafeAreaView>
  )
}

export default {
  screen: SendPaymentByQr,
  path: 'SendPaymentByQr/:name',
  navigationOptions: ({ navigation }) => ({
    ...defaultNavigationOptions,
      title: 'Emitir Pago',
  }),
}
