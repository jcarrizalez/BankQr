import React from 'react';
import {View, Text, Image, toast} from '../react-native';
import styles from '../styles';
import {redux} from '../store';
import Firebase from './Firebase';
import Card from './Card';

export default function Menu()
{
	var portrait = true;

	const url = 'https://st.qubit.tv/assets/public/qubit/app/';
	
  	const {	menu, cards, line, card, img1, img2, img3, img4 } = styles('Menu', portrait);

	return (
		<View style={menu}>
			<View style={cards}>
				<View style={line}>
					<Card 
						title="Configuración" uri={url+'configuration.png'} 
						style={{card,img:img1}} 
						onPress={()=>redux.push('navigate', 'ConfigurationList')} 
					/>
					<Card 
						title="Recibir pago" uri={url+'payment.png'} 
						style={{card,img:img2}} 
						onPress={()=>redux.push('navigate', 'Calculator')} 
					/>
				</View>
				<View style={line}>
					<Card 
						title="Pagar con QR" uri={url+'code.png'} 
						style={{card,img:img3}} 
						onPress={()=>{
							if(!redux.get('payer')){
								toast("Configure un Emisor de Pagos");
							}
							else{
								redux.push('navigate', 'ReadCodeQr')
							}
						}} 
					/>
					<Card 
						title="Pagar sin QR" uri={url+'red.png'} 
						style={{card,img:img4}} 
						onPress={()=>{
							toast("En desarrollo");
						}} 
					/>
				</View>
			</View>
			{!portrait?<Firebase.Banner size='full'/>:null}
		</View>
	);
}