import React from 'react';
import styles from '../styles';
import {View, Text } from '../lib/react-native';
import Touch from './Touch';

const css = styles('Bottom');

export default function Bottom({style={}, onPress, children, onCancel, disabled=false}){

  const Touch_ = ({title, onPress}) => {
    let style_ = title==='CANCELAR'?css.cancel:(disabled?css.action_disabled:css.action)
    return(
    <Touch disabled={disabled} style={{...style_, ...style}} onPress={onPress}>
      <Text style={(disabled && title!=='CANCELAR')?css.text_disabled:css.text}>{title}</Text>
    </Touch>);
  }

  return (
    <View style={css.buttom}>
    	{onCancel?<Touch_ title='CANCELAR' onPress={onCancel}/>:null}
    {/*(typeof onCancel === 'function')?<Touch_ title='CANCELAR' onPress={onCancel}/>:null*/}
      <Touch_ title={children} onPress={onPress}/>
    </View>
  );
}