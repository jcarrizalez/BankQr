import React,{useEffect, useState} from 'react';
import { View, Text, TextInput, SafeAreaView, ScrollView, toast} from '../lib/react-native';
import { defaultNavigationOptions } from '../lib/navigation';
import {Icon} from '../lib/vector-icons';
import {number, uuidv4, object, objectDecode } from '../functions';
import {Banner }  from './Firebase';
import Bottom from './Bottom';
import Touch from './Touch';
import Switch from './Switch';
import styles from '../styles';
import {redux} from '../store';
import {encrypt, decrypt} from '../lib/crypto-js';

const css = styles('RemotePayment');

var is_load = true;
var state = {
};
var link = true;
var old = {};

function RemotePayment({navigation})
{
  const [update, setUpdate] = useState(null);
  var data;
  
  if(is_load){
    is_load = false;
    data = redux.get('route').data;
    state.link='';
    if(data!==null){
      link = false;
      state ={...state, ...data};
    }
  }

  const onChange= (item,value) => {
    if(item==='link'){
      var object = objectDecode(value);
      if(object){
        state = {...state,...object, id:uuidv4()};
      }
      else{
        state.id=null;
      }
    }
    else if(['number','phone'].includes(item)){
      value = value.split('').map((row, key) => (!number(row))? '':row).join('').replace(' ','');
    }
    else if(item==='document'){
      value = value.split('').map((row, key) => (key>0 && !number(row))? '' : row).join('').replace(' ','');
    }
    state[item] = value;
    setUpdate(new Date);
  }

  const onSave= () => {
    
    if(link && !state.id){
      return toast('Link no valido');
    }
    else{
      if(state.bank.length<3){
        return toast('Nombre de Banco minimo 3 caracteres');
      }
      else if(state.headline.length<3){
        return toast('Nombre del titular minimo 3 caracteres');
      }
      else if(state.phone.length<10){
        return toast('Telefono minino 10 caracteres');
      }
      else if(state.identifier.length<1){
      return toast('identificador de documento minimo 1 caracter');
    }
      else if(state.document.length<7){
        return toast('Numero de documento minimo 7 caracteres');
      }
      else if(state.number.length<4){
        return toast('Numero CTA. minimo 4 caracteres');
      }
      else{
        var remote_payments = redux.get('remote_payments');
        let obj = object(state);
        var exist = false;
        remote_payments.forEach(item=>{
          if(item.number===obj.number && item.document===obj.document && item.phone===obj.phone){
            exist = true;
          }
        });

        if(exist){
          return toast('Este Registro ya existe!!!');
        }
        obj.id = uuidv4();
        obj.link = undefined;
        remote_payments.push(obj);
        redux.push('remote_payments',remote_payments, true);
        toast('Nuevo Registro Guardado');
        setTimeout(()=>{
           navigation.goBack();
        }, 100);
      }
    }
  }

  useEffect(() => {
    return () => {
      redux.push('admobRewarded', true);
      is_load = true;
      state = {};
      old = {};
    }
  },[]);
  
  return (
    <SafeAreaView style={css.content}>
      <ScrollView style={css.scrollView}>
        {(link)?
          <View style={css.area}>
            <Text style={css.title}>Link</Text>
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="url con la información *"
                defaultValue={state.link}
                onChangeText={value=>onChange('link',value)}
                maxLength={500}
              />
              <Text style={css.textTitle}>Link Url: {state.link===''?<Text style={css.textAlias}>pega el link</Text>:null}</Text>
            </View>
          </View>
        :null}
          
        {(link && state.id)?
          <View style={css.area}>
            <Text style={css.title}>Banco</Text>
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="nombre de banco *"
                value={state.bank}
                onChangeText={null}
                maxLength={40}
              />
              <Text style={css.textTitle}>Nombre:</Text>
            </View>
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="numero identificador del banco *"
                value={state.number}
                onChangeText={null}
                keyboardType="phone-pad"
                maxLength={40}
              />
              <Text style={css.textTitle}>Numero CTA. del banco:</Text>
            </View>
          </View>
        :null}

        {(link && state.id)?
          <View style={css.area}>
            <Text style={css.title}>Titular</Text>
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="nombre del titular de la cuenta*"
                value={state.headline}
                onChangeText={null}
                maxLength={40}
              />
              <Text style={css.textTitle}>Nombre:</Text>
            </View>
            <View style={css.inputColumn}>
              <View style={css.inputRow}>
                <TextInput
                  style={{...css.textInput, width:'15%', borderTopRightRadius:0}}
                  placeholder="V"
                  value={state.identifier}
                  onChangeText={value=>onChange('identifier',value)}
                  maxLength={3}
                />
                <Text style={{marginTop:20}}> - </Text>
                <TextInput
                  style={{...css.textInput, width:'80%',borderTopLeftRadius:0}}
                  placeholder="11222333"
                  value={state.document.split('').map((str, key)=>{
                    let {length} = state.document
                    length = (length-2)
                    if(key>1 && key<length){
                      str = '*';
                    }
                    return str;
                  }).join('')}
                  onChangeText={null}
                  maxLength={10}
                />
              </View>
              <Text style={css.textTitle}>Documento de Identidad</Text>
            </View>
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="numero teléfonico asociacido al banco *"
                value={state.phone.split('').map((str, key)=>{
                  let {length} = state.phone
                  length = (length-3)
                  if(key>1 && key<length){
                    str = '*';
                  }
                  return str;
                }).join('')}
                onChangeText={null}
                keyboardType="phone-pad"
                maxLength={40}
              />
              <Text style={css.textTitle}>Numero de teléfono: {!state.id?<Text style={css.textAlias}>*ejemplo: 04245555555</Text>:null}</Text>
            </View>
            <View style={css.inputColumn}>
            </View>
          </View>
        :null}

        {(!link && !state.id)?
          <View style={css.area}>
            <Text style={css.title}>Banco</Text>
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="nombre de banco *"
                value={state.bank}
                onChangeText={value=>onChange('bank',value)}
                maxLength={40}
              />
              <Text style={css.textTitle}>Nombre:</Text>
            </View>
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="numero identificador del banco *"
                value={state.number}
                onChangeText={value=>onChange('number',value)}
                keyboardType="phone-pad"
                maxLength={40}
              />
              <Text style={css.textTitle}>Numero CTA. del banco: {!state.id?<Text style={css.textAlias}>*ejemplo: 0102</Text>:null}</Text>
            </View>
          </View>
        :null}

        {(!link && !state.id)?
          <View style={css.area}>
            <Text style={css.title}>Titular</Text>
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="nombre del titular de la cuenta*"
                value={state.headline}
                onChangeText={value=>onChange('headline',value)}
                maxLength={40}
              />
              <Text style={css.textTitle}>Nombre:</Text>
            </View>
            <View style={css.inputColumn}>
              <View style={css.inputRow}>
                <TextInput
                  style={{...css.textInput, width:'15%', borderTopRightRadius:0}}
                  placeholder="V"
                  value={state.identifier}
                  onChangeText={value=>onChange('identifier',value)}
                  maxLength={3}
                />
                <Text style={{marginTop:20}}> - </Text>
                <TextInput
                  style={{...css.textInput, width:'80%',borderTopLeftRadius:0}}
                  placeholder="11222333"
                  value={state.document}
                  onChangeText={value=>onChange('document',value)}
                  maxLength={10}
                />
              </View>
              <Text style={css.textTitle}>Documento de Identidad</Text>
            </View>
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="numero teléfonico asociacido al banco *"
                value={state.phone}
                onChangeText={value=>onChange('phone',value)}
                keyboardType="phone-pad"
                maxLength={40}
              />
              <Text style={css.textTitle}>Numero de teléfono: {!state.id?<Text style={css.textAlias}>*ejemplo: 04245555555</Text>:null}</Text>
            </View>
          </View>
        :null}
        <View style={css.simple}></View>
        <View style={css.banner}>
          <Banner size='lansp'/>
        </View>
        <View style={css.simple}></View>
      </ScrollView>
      <Bottom onPress={onSave}>GUARDAR</Bottom>
    </SafeAreaView>
  );
}

function orderState(accounts){
  redux.push('collector', accounts.find(item=>item.collector===true), true);
  redux.push('payer', accounts.find(item=>item.payer===true), true);
  redux.push('accounts', accounts, true);
  old = object(state);
}

export default {
  screen: RemotePayment,
  path: 'RemotePayment/:name',
  navigationOptions: ({ navigation }) => ({
    ...defaultNavigationOptions,
      title: 'Agregar Cuenta Remota'
  }),
}