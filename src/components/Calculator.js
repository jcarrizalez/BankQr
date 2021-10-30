import React,{useState} from 'react';
import {View, Text, toast} from '../lib/react-native';
import { NavigationEvents, defaultNavigationOptions } from '../lib/navigation';
import {Icon} from '../lib/vector-icons';

import Bottom from './Bottom';
import Touch from './Touch';
import {Banner} from './Firebase';
import styles from '../styles';
import {redux} from '../store';
import {formated, evalAmount} from '../functions';

const css = styles('Calculator');

const onBack = () => {
  redux.push('amount', '0');
  redux.push('navigate', 'Home');
}

const Calculator = () => {

  var [amount, setAmount] = useState('0');

  const onPress = item => setAmount(evalAmount(amount, item));

  const onPayment = () => {
    if(!redux.get('collector')){
      toast("Configure un Recepto de Pagos");
    }
    else if(Number(amount)<=100){
      toast("Monto debe ser mayor a 100 Bs");
    }
    else{
      redux.push('amount', amount);
      redux.push('route', {component:'ShowCodeQr',data:amount});
    }
  }

  return (
    <View style={css.calculator}>
      <NavigationEvents onWillFocus={payload => setAmount(redux.get('amount'))} />
      <View style={css.firebase}>
        <Banner />
      </View>
      <View style={css.area}>
        <View style={css.screen}>
          <Text style={css.amount}>{formated(amount)}</Text>
        </View>
        <View style={css.keyboard}>
          <Key onPress={onPress} keys={[7,8,9]} />
          <Key onPress={onPress} keys={[4,5,6]} />
          <Key onPress={onPress} keys={[1,2,3]} />
          <Key onPress={onPress} keys={['C',0,'.000']} />
        </View>
        <Bottom onCancel={onBack} onPress={onPayment}>CAPTURAR</Bottom>
      </View>
    </View>
  );
}

const Key = ({keys, onPress}) =>
  <View style={css.line}>
    {keys.map((id, key_) => 
      <Touch style={css.base} key={key_} onPress={()=>onPress(''+id)}>
        <Text style={css.key}>{id}</Text>
      </Touch>
    )}
  </View>;

const Back = () => 
  <Touch style={css.touchBack} onPress={onBack}>
    <Icon name='arrow-back' size={25} color="white" solid/>
  </Touch>

export default {
  screen: Calculator,
  path: 'Calculator/:name',
  navigationOptions: ({ navigation }) => ({
    ...defaultNavigationOptions,
      title: 'Indica un Monto a Recibir',
      headerLeft: <Back/>,
  }),
}