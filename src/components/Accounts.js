import React,{useEffect, useState} from 'react';
import { View, Text, SafeAreaView, ScrollView } from '../lib/react-native';
import { NavigationEvents, defaultNavigationOptions } from '../lib/navigation';
import {Icon} from '../lib/vector-icons';
import Touch from './Touch';
import {Add, AddDocumentaion} from './Add';
import {Banner}  from './Firebase';
import styles from '../styles';
import {redux} from '../store';

const css = styles('Accounts');

const onShow= item => redux.push('route', {
  component:'Account',
  data:item.id? item:redux.get('account')
});

const getData = () => redux.get('accounts')??[];

const Accounts = () => {
  var [data, setData] = useState(getData());
  
  /*
  useEffect(() => {
    setTimeout(()=>{
      //onShow(data[1]);
      onShow({});
    }, 500);
  },[]);
  */
  return (
    <SafeAreaView style={css.content}>
      <NavigationEvents onDidFocus={payload => setData(getData())} />
      <ScrollView style={css.scrollView}>
        {data.length===0?<AddDocumentaion title='Agrega una Cuenta' />:null}
        {data.map((item, key) => <Item css={css} item={item} key={key}/>)}
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
  <Touch style={css.item} onPress={()=>onShow(item)}>
    <View style={css.item}>
      <View style={css.bank}>
        <Text style={css.bank_name}>{item.name}</Text>
        <Text style={css.bank_title}>nombre: {item.headline}</Text>
      </View>
      <View style={css.status}>
        {item.payer?<Text style={css.on}>emisor</Text>:null}
        {item.collector?<Text style={css.on}>receptor</Text>:null}
      </View>
      <Icon style={css.itemIcon} name="chevron-right" size={30} color="gray" solid/>
    </View>
  </Touch>

export default {
  screen: Accounts,
  path: 'Accounts',
  navigationOptions: ({ navigation }) => ({
    ...defaultNavigationOptions,
      title: 'Mis Cuentas Bancarias',
    headerRight: <Add onPress={()=>onShow({})}/>,
  }),
}