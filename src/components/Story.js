import React,{useEffect, useState} from 'react';
import { View, Text,SafeAreaView, ScrollView, Alert } from '../lib/react-native';
import { NavigationEvents, defaultNavigationOptions } from '../lib/navigation';
import {Icon} from '../lib/vector-icons';
import Touch from './Touch';
import {uuidv4, formated} from '../functions';
import {Banner} from './Firebase';
import styles from '../styles';
import {redux} from '../store';
import {Add, AddDocumentaion} from './Add';

const css = styles('Story');

const getData = () => redux.get('story')??[];

const Story = () => {

	var [data, setData] = useState(getData());

    useEffect(() => {
      const unsubscribe = redux.subscribe( () => {
        if(redux.is('story')){
          setData(getData());
        }
      });
      return () => unsubscribe();
    },[]);

  	return (
	    <SafeAreaView style={css.content}>
	      <NavigationEvents onDidFocus={payload => setData(getData())} />
	      <ScrollView style={css.scrollView}>
	        {data.reverse().map((item, key) => <Item css={css} item={item} key={key} />)}
	        <View style={css.simple}></View>
	        <View style={css.banner}>
	          <Banner size='lansp'/>
	        </View>
	        {data.length!==0?<View style={css.simple}></View>:null}
	      </ScrollView>
	    </SafeAreaView>
	);
}

const Item = ({item,css}) => 
	<Touch onPress={()=>Alert.alert("Información", 
`Tipo:`+(item.type==='p-qr'?'Pago con Qr':(item.type==='r-qr'?'Ricibir Pago con Qr':'Pago Remoto'))+`
Banco:`+item.bank+`
Nombre:`+item.headline+`
Monto:`+item.amount, [
    {
      text: "Cerrar",
      onPress: () => redux.push('admobRewarded', true),
      style: "cancel"
    }
    ])}>
    <View style={css.item}>
      <View style={css.viewText}>
        <Icon name={item.type==='p-qr'?'qr-code-scanner':(item.type==='r-qr'?'qr-code-2':'send-to-mobile')} size={30} color="gray" solid/>
        <Text style={css.itemAmount}>{formated(item.amount)} Bs</Text>
        <Text style={css.itemText}>{item.bank}</Text>
      </View>
      <Icon style={css.itemIcon} name="chevron-right" size={30} color="gray" solid/>
    </View>
  </Touch>

const Clear = () =>{

  const onClear = item => Alert.alert("Historial", 'Vaciar Historial?', [
    {
      text: "Cancelar",
      onPress: () => redux.push('admobRewarded', true),
      style: "cancel"
    },
    { text: "Eliminar", onPress: () => {
        redux.push('story',[], true);
        redux.push('admobRewarded', true);
    }}
  ]);
  return <Touch style={css.touchClear} onPress={onClear}>
    <Icon name='delete-sweep' size={30} color="white" solid/>
  </Touch>
}

export default {
  screen: Story,
  path: 'Story/:name',
  navigationOptions: ({ navigation }) => ({
    ...defaultNavigationOptions,
      title: 'Historial',
    headerRight: <Clear onPress={()=>onShow({})} />,
  }),
}