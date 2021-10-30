import React from 'react';
import {View, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback} from '../lib/react-native';

const Touch1 = ({style={}, disabled, children, onPress, underlayColor="#f0f4f7"}) =>
	<TouchableOpacity disabled={disabled} style={style} onPress={onPress} activeOpacity={0.5}>
		{children}
	</TouchableOpacity>

const Touch2 = ({style={}, disabled, children, onPress, underlayColor="#FCDC7F"}) =>
	<TouchableHighlight delayLongPress={1000} disabled={disabled} style={style} onPress={onPress} activeOpacity={0.3} underlayColor={underlayColor}>
		{children}
	</TouchableHighlight>

const Touch3 = ({style={}, disabled, children, onPress}) =>
	<TouchableNativeFeedback delayLongPress={1000} disabled={disabled} style={style} onPress={onPress} activeOpacity={0.6}>
		<View style={style}>{children}</View>
	</TouchableNativeFeedback>

export default Touch3;