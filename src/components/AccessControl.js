import React, {useEffect, useState} from 'react';
import {TextInput, Platform, Image, StatusBar, View, Text, SafeAreaView, ScrollView, Dimensions, toast} from '../lib/react-native';
import Wave from '../lib/svg';
import Touch from './Touch';
import {redux} from '../store';
import styles from '../styles';
import {number} from '../functions';

const css = styles('AccessControl');

export default function AccessControl({onCancel, onChange}){

	const [top, setTop] = useState('35%');
	const [security] = useState(redux.get('security').password);
	const [password, setPassword] = useState('');
	/*
	security:{
	    password:'',
	    question_p:'',
	    question_r:'',
	    active:false,
	    menu:[
	      'ReadCodeQr',
	      'Calculator',
	      'RemotePayments',
	      'Story',
	      'Accounts',
	    ]
	  },
  */
	return (
		<View style={css.AccessControl}>
		<StatusBar barStyle="light-content" hidden={true} animated={true} translucent={false}
		  />
	  	<Touch style={css.content} onPress={()=>onCancel(false)} />
	  	<View style={{...css.modal, top}}>
	  		<View style={css.header}>
	  			<Text style={css.title}>PIN de desbloqueo</Text>
	      	</View>
	  		<View style={css.main}>
	      		<View style={css.inputRow}>
	              <TextInput
	                style={{...css.textInput,letterSpacing:(password==='' || password===null)?30:35}}
	                placeholder="****"
	                returnKeyType = {"next"}
	                autoFocus = {true}
	                secureTextEntry={true}
	                caretHidden={true}
	                textContentType={"password"}
           			autoCorrect={false}
	                value={password}
	                onChangeText={value => {
	                	value = value.split('').map((row, key) => (!number(row))? '':row).join('');

	                	if(security===value){
	                		onChange(value);
	                	}else{
	                		setPassword(value.split('').map((row, key) => (!number(row))? '':row).join(''))
	                	}
	                }}
	                keyboardType="numeric"
	                onFocus={()=>setTop('25%')}
	                onBlur={()=>setTop('35%')}
	                maxLength={4}
	              />
	            </View>
	      	</View>
	      	<View style={css.footer}>
	      		<Touch style={css.touchCancel} onPress={()=>{setTop('35%');onCancel(false)}}>
	  				<Text style={css.title}>CANCELAR</Text>
	  			</Touch>
	  			<Text style={css.title} onPress={()=>{setTop('25%');onChange((security===password)?true:false)}}>ACEPTAR</Text>
	      	</View>
	  	</View>
	  </View>
	 )
}