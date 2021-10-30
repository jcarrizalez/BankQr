import React from 'react';
import {View, Text, Image} from '../lib/react-native';
import Touch from './Touch';

const Cardw = ({title, onPress, uri, style:{card, img}}) =>
	<Touch style={card} onPress={onPress}>
		<View style={card}>
			<Image style={img} source={{ uri }} />
			<Text>{title}</Text>
		</View>
	</Touch>;
export default Card;