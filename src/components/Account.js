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
var state = {
};
var old = {};

const css = styles('Account');

function Account({navigation})
{
  const [update, setUpdate] = useState(null);
  const [scroll, setScroll] = useState(null);
  const [accounts_] = useState(redux.get('accounts'));
  
  if(is_load){

    let {accounts, route} = redux.all();
    
    let account = route.data;
    state = object(account);
    old = object(account);
    old.update = update;
    state.current = {};
    let bank = banks.find(row=>row.name===account.name);
    state.current = bank??{};
    is_load = false;
    setUpdate(new Date);
  }

  const onFocus = item => {
    if(typeof item==='string'){
      setScroll(item);
    }
    else if(scroll!==null){
      setScroll(null);
    }
  }

  const onChange = (item, value) => {

    if(['doc_emisor', 'number','phone'].includes(item)){
      value = value.split('').map((row, key) => (!number(row))? '':row);
      if(item==='phone'){
        if(value[3] && !['12','14','24','16','26'].includes(value[2]+value[3])){
          value = [value[0],value[1],value[2]];
          toast('Indica una Operadora valida');
        }
        else if(value[2]){
          value = (['1','2'].includes(value[2]))?value:[value[0],value[1]];
        }
        else if(value[1]){
          value = (value[1]==='4')?value:[value[0]];
        }
        else if(value[0]){
          value = (value[0]==='0')?value:[];
        }
      }
      value = value.join('').replace(' ','');
    }
    else if(item==='doc_emisor'){
      value = value.split('').map((row, key) => (number(row))? '':row).join('').replace(' ','');
    }
    else if(['collector', 'payer'].includes(item) && value){
      
      if(state.headline==='' || state.doc_emisor==='' || state.phone===''){
        toast('Primero Indica el Titular');
        return null;      
      }
    }
    else if(item==='doc_emisor_identifier' && !['j','v','e','p'].includes(value.toLowerCase())){
      value = '';
    }
    else if(item==='name'){
      let bank = banks.find(row=>row.name===value);
      state.bank_id = bank? bank.id : null;
    }
    else if(item==='type_name' && state.current.type){
      let type = state.current.type.find(row=>row.name===value);
      state.type = type? type.value : null;
    }
    state[item] = value;
    setUpdate(new Date);
  }
  const onCoordinates = (key, value) => {

    state.coordinates[key] = value.toUpperCase();
    setUpdate(new Date);
  }

  const onSave= () => {

    if(!banks.find(row=>row.name===state.name)){
      toast('Banco "'+state.name+'" no valido');
      return null;
    }
    else if(!banks_valid.find(row=>row===state.bank_id)){
      toast('Banco no Habilitado en esta versión');
      return null;
    }
    else if(state.headline.length<3){
      return toast('Nombre del titular minimo 3 caracteres');
    }
    else if(state.phone.length<10){
      return toast('Telefono minino 10 caracteres');
    }
    else if(state.doc_emisor_identifier.length<1){
      return toast('identificador de documento minimo 1 caracter');
    }
    else if(state.doc_emisor.length<6){
      return toast('Numero de documento minimo 7 caracteres');
    }
    else if(state.current.type && !state.type){
      return toast('Seleccion un tipo de cuenta valida');
    }
    if(
      state.name===old.name && 
      state.headline===old.headline &&
      state.doc_emisor_identifier===old.doc_emisor_identifier && 
      state.doc_emisor===old.doc_emisor && 
      state.phone===old.phone && 
      state.type===old.type && 
      state.collector===old.collector && 
      state.trade===old.trade && 
      state.payer===old.payer
    ){
      return toast('No hay cambios por guardar');
    }
    else{
      var newData = {line:isLine(state.phone)};
      var {accounts, account} = redux.all();
      if(state.id){
        accounts.forEach((item, key) => {
          if(state.payer===true){
            accounts[key].payer = false;
          }
          if(state.collector===true){
            accounts[key].collector = false;
          }
          if(item.id===state.id){
            Object.keys(account).forEach(key => { 

              if(state[key]!==undefined){
                newData[key] = state[key];
              }
            });
            accounts[key] = object(newData);
          }
        });
        toast('Cambios Guardados');
      }
      else{
        state.id = uuidv4();
        accounts.forEach((item, key) => {
          if(state.payer===true){
            accounts[key].payer = false;
          }
          if(state.collector===true){
            accounts[key].collector = false;
          }
        });

        Object.keys(account).forEach(key => { 
          if(state[key]!==undefined){
            newData[key] = state[key];
          }
        });
        accounts.push(object(newData));
        toast('Nuevo Registro Guardado');
      }
      orderState(accounts);
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

  const type = state.current.type;
  const trade = state.current.trade;
  const coordinates = state.current.coordinates;
  const password_temp = state.current.password_temp;

  return (
    <SafeAreaView style={css.content}>
      <ScrollView style={css.scrollView} scrollEnabled={scroll===null?true:false} nestedScrollEnabled={scroll===null?true:false}>
        <View>
          <SafeAreaView style={css.area}>
            <Text style={css.title}>Banco</Text>
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="nombre de banco *"
                value={state.name}
                onChangeText={value=>onChange('name',value)}
                onFocus={()=>onFocus('name')}
                maxLength={40}
              />
              <InputSelect 
                data={banks}
                value={state.name}
                keysFilter={['id','name','number']}
                visible={(scroll==='name')?true:false}
                name1="name"
                name2="number"
                onPress={ item => {
                  if(state.id===null && accounts_.find(row=>row.bank_id===item.id)){
                    toast('Este Banco ya existe en tu lista');
                    return null;
                  }
                  onChange('current',item);
                  onChange('name',item.name);
                  onChange('bank_id',item.id);
                  onChange('type_name','');
                  onChange('type',null);
                  setScroll(null);
                }}
              />
              <Text style={css.textTitle}>{type?'Nombre:':''}</Text>
            </View>
            {type?
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="tipo de cuenta *"
                value={state.type_name}
                onChangeText={value=>onChange('type_name',value)}
                onFocus={()=>onFocus('type')}
                maxLength={40}
              />
              <InputSelect 
                data={type}
                value={state.type_name}
                keysFilter={['name','value']}
                visible={(scroll==='type')?true:false}
                name1="name"
                name2="value"
                onPress={ item => {
                  onChange('type_name',item.name);
                  onChange('type',item.value);
                  setScroll(null);
                }}
              />
              <Text style={css.textTitle}>Tipo de Cuenta:</Text>
            </View>
            :null}
          </SafeAreaView>
          <View style={css.area}>
            <Text style={css.title}>Titular</Text>
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="nombre del titular de la cuenta*"
                value={state.headline}
                onChangeText={value=>onChange('headline',value)}
                onFocus={onFocus}
                maxLength={40}
              />
              <Text style={css.textTitle}>Nombre:</Text>
            </View>
            <View style={css.inputColumn}>
              <View style={css.inputRow}>
                <TextInput
                  style={{...css.textInput, width:'15%', borderTopRightRadius:0}}
                  placeholder="V"
                  value={state.doc_emisor_identifier.toUpperCase()}
                  onChangeText={value=>onChange('doc_emisor_identifier',value)}
                  onFocus={onFocus}
                  maxLength={3}
                />
                <Text style={{marginTop:20}}> - </Text>
                <TextInput
                  style={{...css.textInput, width:'80%',borderTopLeftRadius:0}}
                  placeholder="11222333"
                  value={state.doc_emisor}
                  keyboardType="phone-pad"
                  onChangeText={value=>onChange('doc_emisor',value)}
                  onFocus={onFocus}
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
                onFocus={onFocus}
                maxLength={12}
              />
              <Text style={css.textTitle}>Numero de teléfono: <Text style={css.textAlias}>{(!state.id && state.phone==='')?' ejemplo: 04245554433':null}</Text></Text>
            </View>
          </View>
          {coordinates?
          <View style={css.area}>
            <Text style={css.title}>Tarjeta de Coordenadas</Text>
            <Text style={css.textAlias}>coordenadas de su tarjeta de seguridad (opcional)</Text>
            <Text style={css.textAlias}>al pagar se tomara una Coordenada aleatoriamente,</Text>
            <Text style={css.textAlias}>sin al menos una Coordenada se le pedira al hacer un pago</Text>
            <View style={css.inputColumn}>
              <View style={css.inputRow}>
                {[0,1,2,3,4].map(item =>
                  <TextInput key ={item}
                  style={{...css.textInput, width:'18%', borderTopRightRadius:0}}
                  placeholder=""
                  value={state.coordinates[item]??''}
                  onChangeText={value=>onCoordinates(item,value)}
                  onFocus={onFocus}
                  maxLength={4}
                />)}
              </View>
              <Text style={css.textTitle}></Text>
            </View>
            <View style={css.inputColumn}>
              <View style={css.inputRow}>
                {[5,6,7,8,9].map(item =>
                  <TextInput key ={item}
                  style={{...css.textInput, width:'18%', borderTopRightRadius:0}}
                  placeholder=""
                  value={state.coordinates[item]??''}
                  onChangeText={value=>onCoordinates(item,value)}
                  onFocus={onFocus}
                  maxLength={4}
                />)}
              </View>
              <Text style={css.textTitle}></Text>
            </View>
            <View style={css.inputColumn}>
              <View style={css.inputRow}>
                {[10,11,12,13,14].map(item =>
                  <TextInput key ={item}
                  style={{...css.textInput, width:'18%', borderTopRightRadius:0}}
                  placeholder=""
                  value={state.coordinates[item]??''}
                  onChangeText={value=>onCoordinates(item,value)}
                  onFocus={onFocus}
                  maxLength={4}
                />)}
              </View>
              <Text style={css.textTitle}></Text>
            </View>
          </View>
          :null}
          <View style={css.area}>
            <Text style={css.title}>Configuración</Text>
            <View style={css.inputRowConf}>
              <Text style={css.textTitleConf}>Pagar con esta cuenta: </Text>
              <Switch value={state.payer} color="orange" onChange={isOn=>onChange('payer',isOn)} />
            </View>
            {(password_temp && state.payer)?
              <View style={{width:'100%', bottom:10,left:-5}}>
                <Text style={css.textAlias}>Cuando pagues tendras la opcion de clave temporal</Text>
              </View>
            :null}
            <View style={css.inputRowConf}>
              <Text style={css.textTitleConf}>Recibir pagos con esta cuenta: </Text>
              <Switch value={state.collector} color="orange" onChange={isOn=>onChange('collector',isOn)} />
            </View>
            {(trade && state.collector)?
            <View style={css.inputRowConf}>
              <Text style={css.textTitleConf}>Recibir pagos como Comercio: </Text>
              <Switch value={(state.trade===true)?true:false} color="orange" onChange={isOn=>onChange('trade',isOn)} />
            </View>
            :null}
            {(trade && state.collector)?
              <View style={{position:'absolute',width:'100%', bottom:0,left:0}}>
                <Text style={css.textAlias}>Esta opcion es requeria por algunos bancos</Text>
              </View>
            :null}
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

const Actions = ({navigation}) => {

  const [id, setId] = useState(redux.get('route').data.id??null);
  
  const onPress= () => Alert.alert("Confirmación", 'Eliminar "'+state.bank+'"?',[
    {
      text: "Cancel",
      onPress: () => null,
      style: "cancel"
    },
    { text: "Eliminar ", onPress: () => {
        let {accounts, account } = redux.all();
        accounts = accounts.filter(r => r.id !== id);
        orderState(accounts);
        toast('Registro Eliminado');
        navigation.goBack();
      }
    }
  ]);

  useEffect(() => {
    const unsubscribe = redux.subscribe( () => {
      if(redux.is('accounts')){
        setId(state.id??null);
      }
    });
    return () => unsubscribe();
  },[]);

  return id?
    <View style={{display:'flex', flexDirection: 'row',}}>
      <Touch onPress={onCopy} style={css.touchRemove}>
        <Icon name="content-copy" size={23} color="white" solid/>
      </Touch>
      <Touch onPress={onShare} style={css.touchRemove}>
        <Icon name="share" size={23} color="white" solid/>
      </Touch>
      <Touch style={css.touchRemove} onPress={onPress}>
        <Icon name='delete-sweep' size={30} color="white" solid/>
      </Touch>
    </View>
  :null
}

function orderState(accounts){
  let collector = accounts.find(item=>item.collector===true);
  let payer = accounts.find(item=>item.payer===true);
  redux.push('collector', collector??false, true);
  redux.push('payer', payer??false, true);
  redux.push('accounts', accounts, true);
  old = object(state);
}

const dataUrl = () =>{
  let string = stringFormat(state);
  string = redux.get('link')+(encrypt(stringify(string)));
  //console.log(string)
  return `BankQr: `+state.name+` 
`+encodeURI(string);
}

const onCopy = () => {
  Clipboard.setString(dataUrl()),
  toast('Cuenta "'+state.name+'"" copiada al portapapeles')
}

const onShare = async () => {
    try {
      const result = await Share.share({
        message: dataUrl()
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      toast(error.message);
    }
  };

export default {
  screen: Account,
  path: 'Account',
  navigationOptions: ({ navigation }) => ({
    ...defaultNavigationOptions,
      title: 'Cuenta',
    headerRight: <Actions navigation={navigation}/>,
  }),
}


