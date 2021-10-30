import React, {useEffect, useState} from 'react';
import {View } from '../lib/react-native';
import {redux} from '../store';
import styles from '../styles';
import Touch from './Touch';

const css = styles('AdvertisingBar');

const AdvertisingBar = ({onPress}) => {

	const [score, setScore] = useState(redux.get('score'));

	useEffect(() => {
		const unsubscribe = redux.subscribe( () => {
			if(redux.is('score')){
				setScore(redux.get('score'));
		    }
		});
		return () => unsubscribe();
	},[]);
	
	var width = ( (score>10)? 10 : score ) * 10;
	width = width===0? 3: width;
	var color = 'yellow';
	if(width<=20){
		color = 'red';
	}
	else if(width>=60){
		color = 'green';
	}
	return (
		<View style={css.content}>
			<Touch onPress={onPress} style={{...css.bar, backgroundColor: color, width: width+'%',borderTopRightRadius:(width===100)?4:0, borderBottomRightRadius:(width===100)?4:0}}>
			</Touch>
		</View>
	)
}
export default AdvertisingBar;
//m.width = m.status? ((m.status.progress/m.time_finish)*100 ) : null;
