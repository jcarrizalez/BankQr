import React,{useState, useEffect} from 'react';
import { View, Text,SafeAreaView, ScrollView, Alert } from '../lib/react-native';
import { NavigationEvents, defaultNavigationOptions } from '../lib/navigation';
import {Icon} from '../lib/vector-icons';
import Touch from './Touch';
import {Banner} from './Firebase';
import styles from '../styles';
import {redux} from '../store';
import {Add, AddDocumentaion} from './Add';

const css = styles('RemotePayments');

const onShow= item => Alert.alert("Nuevo Registro", 'Tienes un Links Copiado?', [
  	{
      text: "Cancelar",
      onPress: () => null,
      style: "cancel"
    },
    {
      text: "No",
      onPress: () => redux.push('route', {
		    component:'RemotePayment',
		    data:redux.get('remote_payment')
	    }),
      style: "cancel"
    },
    { text: "Si", onPress: () => redux.push('route', {
	    component:'RemotePayment',
	    data:null
    })}
]);

const getData = () => redux.get('remote_payments')??[];

const RemotePayments = () => {

	  var [data, setData] = useState(getData());

  	const onDelete = item => Alert.alert("Eliminar", item.headline, [
      	{
          text: "Cancelar",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Eliminar", onPress: () => {
            data = data.filter(r => r.id !== item.id);
            redux.push('remote_payments',data, true);
            setData(data);
        }}
  	]);
    /*
    useEffect(() => {
      setTimeout(function() {
      redux.push('route', {
        component:'RemotePayment',
        data:redux.get('remote_payment')
      })
      }, 1000)
    },[]);
  */
  	return (
	    <SafeAreaView style={css.content}>
	      <NavigationEvents onDidFocus={payload => setData(getData())} />
	      <ScrollView style={css.scrollView}>
	        {data.length===0?<AddDocumentaion title='Agrega un Destinatario' />:null}
	        {data.map((item, key) => <Item css={css} item={item} key={key} onDelete={onDelete}/>)}
	        <View style={css.simple}></View>
	        <View style={css.banner}>
	          <Banner size='lansp'/>
	        </View>
	        {data.length!==0?<View style={css.simple}></View>:null}
	      </ScrollView>
	    </SafeAreaView>
	);
}

const Item = ({item,css, onDelete}) => 
	<Touch style={css.item} onPress={()=>redux.push('route', {
	  	component:'CalculatorSend',
	  	data:item
  	})}>
    <View style={css.item}>
		<View style={css.bank}>
			<Text style={css.bank_name}>{item.headline}</Text>
			<Text style={css.bank_title}>banco: {item.name}</Text>
		</View>
		<Touch style={css.action} onPress={()=>onDelete(item)}>
				<Icon style={css.deleteIcon} name="delete-sweep" size={30} color="gray" solid/>
		</Touch>
	</View>
  </Touch>

export default {
  screen: RemotePayments,
  path: 'RemotePayments/:name',
  navigationOptions: ({ navigation }) => ({
    ...defaultNavigationOptions,
      title: 'Pago Remoto',
    headerRight: <Add onPress={()=>onShow({})} />,
  }),
}