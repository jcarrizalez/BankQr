import React,{useEffect, useCallback} from 'react';
import {View, SafeAreaView, ScrollView, Linking, toast} from '../lib/react-native';
import { defaultNavigationOptions } from '../lib/navigation';
import {Banner}     from './Firebase';
import Item from './Item';
import styles from '../styles';
import {redux} from '../store';
const css = styles('Help');

const Help = () => {

  const onShow= account => null;
  var url = 'https://jcarrizalez.github.io/bankqr-page/?view=';
  const handlePress = useCallback(async section => {
    url = url+section;
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      toast('Error cargando pagina');
    }

  }, [url]);

    useEffect(() => {
    return () => redux.push('admobInterstitial', true);
  },[]);

  return (
    <SafeAreaView style={css.content}>
      <ScrollView style={css.scrollView}>
        <Item icon="assistant" title="Centro de asistencia" onPress={()=>handlePress('assistance')}  />
        <Item icon="local-police" title="Politicas" onPress={()=>redux.push('route', { component:'Politics', data:null})}  />
        <Item icon="library-books" title="Terminos y Condiciones" onPress={()=>redux.push('route', { component:'Terms', data:null})}  />
        <Item icon="security" title="Permisos" onPress={()=>Linking.openSettings()}  />
        <Item icon="developer-mode" title="Creditos" onPress={()=>handlePress('credits')}  />
        <View style={css.simple}></View>
        <View style={css.banner}>
          <Banner size='lansp'/>
        </View>
        <View style={css.simple}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default {
  screen: Help,
  path: 'Help/:name',
  navigationOptions: ({ navigation }) => ({
    ...defaultNavigationOptions,
      title: 'Ayuda',
  }),
}
