import React,{useEffect, useState} from 'react';
import { View, Text, Alert,TextInput, SafeAreaView, ScrollView, Linking, Share, Clipboard, toast} from '../lib/react-native';
import { defaultNavigationOptions } from '../lib/navigation';
import {Icon} from '../lib/vector-icons';
import {number, uuidv4, parse, stringify, object} from '../functions';
import {Banner}  from './Firebase';
import Bottom from './Bottom';
import InputSelect from './InputSelect';
import Touch from './Touch';
import Switch from './Switch';
import styles from '../styles';
import {redux, banks} from '../store';
import {encrypt} from '../lib/crypto-js';

var is_load = true;
var state = {
};
var old = {};
var path_comand = '';

const css = styles('Account');

const comand = (order, state, print) => {
  var value = '';
  order.forEach(item=>{
    if(print){

      if(item==='document' && state.use_identifier===true){
        value+= state.identifier+state[item]+' ';
      }
      else{
        value+= state[item]+' ';
      }
    }
    else{
      value+= item+' ';
    }
  });
  return value.trim();
}

function Account({navigation})
{
  const [update, setUpdate] = useState(null);
  const [scroll, setScroll] = useState(null);

  if(is_load){
    let account = redux.get('route').data;
    state = object(account);
    state.name = (account.id)?name:'';
    is_load = false;
    //state.amount = '100,00';
    old = object(account);
    old.update = update;
    state.banks = banks;
    state.current = {};

    /*
    state.path_comand = comand(state.path_order, state);
    path_comand = comand(state.path_order, state, true);
    */
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
          toast('Indica un Operadora valida');
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
      let bank = state.banks.find(row=>row.name===value);
      state.id = bank? bank.id : null;
    }
    /*
    else if(item==='use_identifier' && value && state.doc_emisor_identifier===''){
      toast('Tipo de documento en el titular');
      return null; 
    }

    state.path_comand = comand(state.path_order, state);
    path_comand = comand(state.path_order, state, true);
    */
    state[item] = (typeof value==='string')?value.trim() : value;
    state[item] = value;
    setUpdate(new Date);
  }

  const onPath = (type, id) => {

    var order = state.path_order;

    var new_order = parse(stringify(order));

    var position = order.map( (item, key) => (id===item)? key:null).find(item=>item!==null);
    
    var key = null;

    if(position>0 && type==='<'){
      key = -1;
    }
    else if(position<(order.length-1) && type==='>'){
      key = 1;
    }
    if(position===null || key===null) return null;

    new_order[position] = new_order[position+key];
    new_order[position+key] = id;
    state.path_order = new_order;
    state.path_comand = comand(new_order, state);
    path_comand = comand(new_order, state, true);
    setUpdate(new Date);
  }

  const onSave= () => {
    //interstitial.show();
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
    else if(state.document.length<6){
      return toast('Numero de documento minimo 7 caracteres');
    }
    else if(state.number.length<4){
      return toast('Numero CTA. minimo 4 caracteres');
    }
    else if(state.number_sms.length<3){
      return toast('Numero SMS minimo 3 digitos');
    }
    
    if(
      state.bank===old.bank && 
      state.number===old.number && 
      state.number_sms===old.number_sms && 
      state.prefix===old.prefix && 
      state.headline===old.headline &&
      state.identifier===old.identifier && 
      state.document===old.document && 
      state.phone===old.phone && 
      state.collector===old.collector && 
      state.payer===old.payer && 
      state.use_identifier===old.use_identifier
    ){
      return toast('No hay cambios por guardar');
    }
    else{
      var newData = {};
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
      path_comand = '';
    }
  },[]);

  //state.current.number_sms = state.current.number_sms??[];

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
                data={state.banks}
                value={state.name}
                keysFilter={['name','number']}
                visible={(scroll==='name')?true:false}
                name1="name"
                name2="number"
                onPress={ item => {
                  onChange('name',item.name);
                  onChange('id',item.id);
                  setScroll(null)
                  /*
                  onChange('current',item);
                  //onChange('number_sms',item.number_sms[0]??'');
                  //onChange('prefix',item.prefix);
                  */
                }}
              />
              <Text style={css.textTitle}></Text>
              {/*
              <Text style={css.textTitle}>Nombre:</Text>
              */}
            </View>
            {/*
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="numero identificador del banco *"
                value={state.number}
                onChangeText={value=>onChange('number',value)}
                keyboardType="phone-pad"
                onFocus={onFocus}
                maxLength={10}
              />
              <Text style={css.textTitle}>Numero CTA. del banco: {(state.number==='' && !state.id)?<Text style={css.textAlias}>*ejemplo: 0102</Text>:null}</Text>
            </View>
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="numero donde se envia el mensaje*"
                value={state.number_sms}
                onChangeText={value=>onChange('number_sms',value)}
                keyboardType="phone-pad"
                onFocus={onFocus}
                maxLength={12}
              />
              <Text style={css.textTitle}>
                Numero SMS.: 
                <Text style={css.textAlias}>
                {
                  (!state.id && state.number==='')?
                    ' ejemplo: 262':
                  (state.current.number_sms.length>1)?
                    ' tambien tienes ( '+state.current.number_sms.filter(item=>item!==state.number_sms).join(', ')+' )'
                  :null
                }
                </Text>
                </Text>
            </View>
            <View style={css.inputColumn}>
              <TextInput
                style={css.textInput}
                placeholder="pagar*"
                value={state.prefix}
                onChangeText={value=>onChange('prefix',value)}
                autoCapitalize={'none'}
                onFocus={onFocus}
                maxLength={40}
              />
              <Text style={css.textTitle}>Prefijo: 
                <Text style={css.textAlias}>{(!state.id && state.prefix==='')?' ejemplo: mibanco, pagar':null}</Text></Text>
            </View>
            */}
          </SafeAreaView>

          
          <View style={{...css.area, zIndex:-1}}>
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
          <View style={css.area}>
            <Text style={css.title}>Configuración</Text>
            <View style={css.inputRowConf}>
              <Text style={css.textTitleConf}>Recibir pagos con esta cuenta: </Text>
              <Switch value={state.collector} color="orange" onChange={isOn=>onChange('collector',isOn)} />
            </View>
            <View style={css.inputRowConf}>
              <Text style={css.textTitleConf}>Pagar con esta cuenta: </Text>
              <Switch value={state.payer} color="orange" onChange={isOn=>onChange('payer',isOn)} />
            </View>
            {/*
            {state.payer?
              <View style={css.inputRowConf}>
                <Text style={css.textTitleConf}>Tu banco requiere la letra del rif, cedula?</Text>
                <Switch value={state.use_identifier} color="orange" onChange={isOn=>onChange('use_identifier',isOn)} />
              </View>:null}
              {state.payer?
              <View style={{...css.pathLine, height: 20}}>
                <Text style={css.textPath}>ejemplo con tus datos</Text>
              </View>:null}
              {state.payer?
              <View style={{...css.pathLine, height: 20}}>
                <Text style={css.textPath}>{path_comand}</Text>
              </View>:null}
              {state.payer?
              <Text style={{...css.title, marginTop:20}}>Orden PATH</Text>:null}
              {state.payer?
              <View style={{justifyContent: 'center', width:'100%'}}>
                <View style={{...css.pathLine, height: 30}}>
                  <View style={css.th}><Text style={css.thT}>descripcion</Text></View>
                  <View style={css.th}><Text style={css.thT}>valor</Text></View>
                  <View style={css.thN}><Text style={css.thT}>left</Text></View>
                  <View style={css.thN}><Text style={css.thT}>right</Text></View>
                </View>
                <ItemP css={css} id="prefix" title="prefijo" onPath={onPath} state={state} />
                <ItemP css={css} id="number" title="numero CTA" onPath={onPath} state={state} />
                <ItemP css={css} id="document" title="documento" onPath={onPath} state={state} />
                <ItemP css={css} id="phone" title="telefono" onPath={onPath} state={state} />
                <ItemP css={css} id="amount" title="monto" onPath={onPath} state={state} />
              </View>:null}
            */}
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
/*
const ItemP = ({css, id, title, state, onPath}) =>
  <View style={css.pathLine}>
    <View style={css.td}><Text style={css.tdT}>{title}</Text></View>
    <View style={css.td}><Text style={css.tdT}>{((id==='document' && state.use_identifier===true)?state.identifier:'')+state[id]}</Text></View>
    <View style={css.tdN}>
      <Touch style={css.tdTN} onPress={()=>onPath('<', id)}>
        <Icon style={css.tdIcon1} name="keyboard-arrow-left" size={30} color="black" solid/>
      </Touch>
    </View>
    <View style={css.tdN}>
      <Touch style={css.tdTN} onPress={()=>onPath('>', id)}>
        <Icon style={css.tdIcon2} name="keyboard-arrow-right" size={30} color="black" solid/>
      </Touch>
    </View>
  </View>;
*/
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
        state = object(account);
        old = object(account);
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
  let string = state.bank+'|'+state.number+'|'+state.phone+'|'+state.identifier+'|'+state.document+'|'+state.headline;
  string = redux.get('link')+(encrypt(stringify(string)));
  return `BankQr: `+state.bank+` 
`+encodeURI(string);
}

const onCopy = () => {
  Clipboard.setString(dataUrl()),
  toast('Cuenta "'+state.bank+'"" copiada al portapapeles')
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


