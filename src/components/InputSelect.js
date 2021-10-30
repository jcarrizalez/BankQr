import React,{useEffect, useState} from 'react';
import { View, Text, Alert,TextInput, SafeAreaView, ScrollView, Linking, Share, Clipboard, toast} from '../lib/react-native';
import Touch from './Touch';
import styles from '../styles';

const css = styles('InputSelect');

const InputSelect=({style, visible, data=[], onPress, keysFilter,value='', name1=null,name2=null})=> {

	if(value!==''){
	   data = data.filter(item=> {
	   	var result = null;
	   	if(keysFilter===undefined){
	   		if(item.toLowerCase().indexOf(value.toLowerCase())!==-1){
	   			result = item;
	   		}
	   	}
	   	else{
		   	keysFilter.forEach(key => {
		   		if(item[key].toLowerCase().indexOf(value.toLowerCase())!==-1){
		   			result = item;
		   		}
		   	})
	   	}
	   	return result;
	   }).filter(item=>item!==null);
	}

	if(!visible) return null;
                
	return(
		<ScrollView style={{...css.scrollViewItem, height:(data.length>4)?196:(data.length * 40)}} scrollEnabled={true} nestedScrollEnabled={true}> 
			{data.map((item, key)=> {
                return  <Touch key={key} style={css.itemText} onPress={()=>onPress(item)}>
                  <Text style={css.textItemName}>{name1?item[name1]:item}</Text>
                  <Text style={css.textItemNumber}>{name2?item[name2]:null}</Text>
                </Touch>
            })}
		</ScrollView>
	);
}
export default InputSelect;
