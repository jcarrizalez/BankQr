import React, {useEffect, useState} from 'react';
import { Platform, View, Text } from '../lib/react-native';
import { AppNavigator } from '../lib/navigation';
import store, {storage, redux} from '../store';

import Help from './Help';
import Home from './Home';
import Terms from './Terms';
import Story from './Story';
import Account from './Account';
import Security from './Security';
import Accounts from './Accounts';
import Firebase from './Firebase';
import Politics from './Politics';
import Calculator from './Calculator';
import ShowCodeQr from './ShowCodeQr';
import ReadCodeQr from './ReadCodeQr';
import HowDoesItWork from './HowDoesItWork';
import RemotePayment from './RemotePayment';
import RemotePayments from './RemotePayments';
import CalculatorSend from './CalculatorSend';
import SendPaymentByQr from './SendPaymentByQr';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';

//const { width, height } = Dimensions.get('window');

var path;

const Register = ({navigation}) => {

	//const [portrait, setPortrait] = useState((width>height)?false: true);
	const [portrait, setPortrait] = useState(true);
	const [update, setUpdate] = useState(null);
	const [load, setLoad] = useState(false);

	useEffect(() => {

	    //cargo el store de redux a usar
		Object.keys(storage).forEach( async (key) => { 
			let value = await store.getItem(key);
			storage[key] = (value!==null)? JSON.parse(value):storage[key];
			if(key==='amount'){
				await redux.store(storage);
				if(!storage.help){
					redux.push('navigate', 'HowDoesItWork');
				}
				try{
					//const majorVersionIOS = parseInt(Platform.Version, 10);
					if( Platform.OS !== 'ios' && Platform.Version > 23){
			        	const response = await changeNavigationBarColor('#000000');
					}
			    }catch(e){
			    }
			    setTimeout(function() {
		        	setLoad(true);
		      	}, 300)
			}
		});
	});
	
	useEffect(() => {
	    const unsubscribe = redux.subscribe( () => {
	    	if(redux.is('accounts') || redux.is('remote_payments')){
		      	setUpdate(new Date);
		    }
		    else if(redux.is('goBack')){
		      	navigation.goBack();
		    }
		    else if(redux.is('navigate')){
		      	var component = redux.get('navigate');
		      	if(path!==component){
		      		path=component;
		      		navigation.navigate(component);
		      	}
	      	} 
	      	else if(redux.is('route')){
		      	var {component, data} = redux.get('route');
		      	if(path!==component){
		      		path=component;
		      		navigation.push(component, data);
		      	}
	      	} 
	    });
	    return () => unsubscribe();
	},[]);
	
	/*
	useEffect(() => {
		//if(load) redux.push('navigate', 'Accounts');
		if(load) redux.push('navigate', 'RemotePayments');
		//if(load) redux.push('navigate', 'SendPaymentByQr');
		//if(load) redux.push('route', {component:'SendPaymentByQr',data:'https://mybankqr.page.link/?link=https://mybankqr.page.link/zXbp?U2FsdGVkX1+EDpjYqdcuebQlC9G8UnzaYVvLHF9ZagJ3QsWAyyjkswJIpOYpirSV7ppvkX7ID/R11zN2AZSthwQVP2qg2z8Hw3eWfuYVgp8='});
	},[load]);
	*/
	
	return (
		<View style={{flex: 1}}>
			{load?<Firebase />:null}
			{/*
			*/}
			<Home.screen load={load}/>
		</View>
	);
}

export default AppNavigator(
{
	Home:{...Home, screen:Register},
	Help,
	Story,
	Terms,
	Account,
	Accounts,
	Security,
	Politics,
	Calculator,
	ReadCodeQr,
	ShowCodeQr,
	HowDoesItWork,
	RemotePayment,
	RemotePayments,
	SendPaymentByQr,
	CalculatorSend,
},
{
	onTransitionStart:() => null,
	onTransitionEnd:() => {path=null}
});