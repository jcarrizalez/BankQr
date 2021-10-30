import React,{useEffect, useState} from 'react';
import { View, Text, Alert,TextInput, SafeAreaView, ScrollView, Linking, Share, Clipboard, toast} from '../lib/react-native';
import { defaultNavigationOptions } from '../lib/navigation';
import {Icon} from '../lib/vector-icons';
import {number, isLine, stringFormat, uuidv4, parse, stringify, object} from '../functions';
import {Banner}  from './Firebase';
import Bottom from './Bottom';
import InputSelect from './InputSelect';
import Touch from './Touch';
import Switch from './Switch';
import styles from '../styles';
import {redux, banks, banks_valid} from '../store';
import {encrypt} from '../lib/crypto-js';

var is_load = true;
var is_init = true;
var state = {
  password:'',
  question_p:'',
  question_r:'',
  active:false,
  menu:[]
};
var old = {};

const css = styles('Account');

function Security({navigation})
{
  const [update, setUpdate] = useState(null);
  
  if(is_load){

    let security = redux.get('security');
    is_init = (security.password==='')? true :false;
    security.password_confirm = security.password;
    security.current = '';
    state = object(security);
    old = object(security);
    old.update = update;
    is_load = false;
    setUpdate(new Date);
  }

  const onChange = (item, value) => {

    if(['password', 'password_confirm','current'].includes(item)){
      value = value.split('').map((row, key) => (!number(row))? '':row).join('');
    }
    state[item] = value;
    setUpdate(new Date);
  }

  const onSave= () => {

    if(state.password.length!==4){
      return toast('PIN deben ser 4 digitos');
    }
    else if(state.password_confirm.length!==4){
      return toast('PIN deben ser 4 digitos');
    }
    else if(state.password!==state.password_confirm){
      return toast('Confirmación de PIN es distinto');
    }
    else if(old.password!=='' && state.current===''){
      return toast('indica el PIN actual');
    }
    else if(old.password!=='' && old.password!==state.current){
      return toast('PIN actual es distinto al registrado');
    }
   
    if(
      state.active===old.active && 
      state.password===old.password && 
      state.password_confirm===old.password_confirm
    ){
      return toast('No hay cambios por guardar');
    }
    else{
      let security = parse(stringify(state));
      delete security.password_confirm;
      redux.push('security', security, true);
      old = object(state);
      toast('Cambios Guardados');
      setUpdate(new Date);
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
      <ScrollView style={css.scrollView} >
        <View>
          <View style={css.area}>
            <Text style={css.title}>PIN de bloqueo</Text>
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="****"
                value={state.password}
                onChangeText={value=>onChange('password',value)}
                maxLength={4}
                returnKeyType = {"next"}
                secureTextEntry={true}
                textContentType={"password"}
                autoCorrect={false}
                keyboardType="numeric"
              />
              <Text style={css.textTitle}>PIN:</Text>
              <TextInput
                style={css.textInput}
                placeholder="****"
                value={state.password_confirm}
                onChangeText={value=>onChange('password_confirm',value)}
                maxLength={4}
                returnKeyType = {"next"}
                secureTextEntry={true}
                textContentType={"password"}
                autoCorrect={false}
                keyboardType="numeric"
              />
              <Text style={css.textTitle}>Confirmación:</Text>
            </View>
          </View>
          {(!is_init && old.password!=='')?
          <View style={css.area}>
            <Text style={css.title}>PIN de actual</Text>
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="PIN actual si deseas hacer algun cambio"
                value={state.current}
                onChangeText={value=>onChange('current',value)}
                maxLength={4}
                returnKeyType = {"next"}
                secureTextEntry={true}
                textContentType={"password"}
                autoCorrect={false}
                keyboardType="numeric"
              />
              <Text style={css.textTitle}>PIN actual:</Text>
            </View>
          </View>
          :null}

          <View style={css.area}>
            <Text style={css.title}>Bloqueo de App</Text>
            <View style={css.inputRowConf}>
              <View style={{display:'flex',flexDirection:'row' }}>
                <Icon name="security" size={20} color="gray" solid/>
                <Text style={css.textTitleConf}> Activar bloqueo: </Text>
              </View>
              <Switch value={state.active} color="orange" onChange={isOn=>onChange('active',isOn)} />
            </View>
          </View>
          
        </View>
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

export default {
  screen: Security,
  path: 'Security',
  navigationOptions: ({ navigation }) => ({
    ...defaultNavigationOptions,
      title: 'Seguridad en Menú',
  }),
}



