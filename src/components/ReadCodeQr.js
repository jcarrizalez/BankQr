import React,{useState} from 'react';
import {View, Text, toast} from '../lib/react-native';
import { NavigationEvents, defaultNavigationOptions } from '../lib/navigation';
import { QRCodeScanner } from '../lib/qrcode-scanner';
import {Icon} from '../lib/vector-icons';
import { Camera } from '../lib/camera';
import {Banner} from './Firebase';
import Touch from './Touch';
import Bottom from './Bottom';
import {redux} from '../store';
import styles from '../styles';

const css = styles('ReadCodeQr');

const ReadCodeQr = () => {

  const [activate, setActivate] = useState(false);

  const onRead = e => redux.push('route', {component:'SendPaymentByQr',data:e.data});
   
  //Camera.Constants.FlashMode.touch;

  return (
    <View style={css.area}>
      <NavigationEvents
        onWillFocus={payload => setActivate(true)}
        //onDidFocus={payload => console.log('did focus',payload)}
        //onWillBlur={payload => console.log('will blur',payload)}
        onDidBlur={payload => setActivate(false)}
      />
      <View style={css.read_codeqr}>
        {activate?
          <QRCodeScanner
            onRead={onRead}
            cameraStyle={css.cameraStyle}
            containerStyle={css.containerStyle}
            topViewStyle={css.topViewStyle}
            markerStyle={css.markerStyle}
            bottomViewStyle={css.bottomViewStyle}
            flashMode={Camera.Constants.FlashMode.off}
            //fadeIn={true}
            //reactivate={true}
            //reactivateTimeout={2}
            //cameraTimeout={20}
            showMarker={true}
            checkAndroid6Permissions={true}
            permissionDialogTitle="Permiso en CodeQr"
            permissionDialogMessage="Permite usar la camera en esta app"
            topContent={<Text style={css.loading_text}>Escaneando Qr...</Text>}
            bottomContent={(<View style={css.firebase}>
              <Banner />
            </View>)}
          />
          :null
        }
      </View>

      <Bottom onPress={()=> redux.push('navigate', 'Home')}>CANCELAR</Bottom>
    </View>
  );
}
const Flash = () => {

  const [active, setActivate] = useState(false);
  const onPress= () => toast('no disponible para esta versión');
  
  return (
    <Touch style={css.touchCamera} onPress={onPress}>
      <Icon name={active?'flash-on':'flash-off'} size={25} color="white" solid/>
    </Touch>
  )
}

export default {
  screen: ReadCodeQr,
  path: 'ReadCodeQr/:name',
  navigationOptions: ({ navigation }) => ({
    ...defaultNavigationOptions,
      title: 'Pagar con Qr',
      headerRight: <Flash />,
  }),
}