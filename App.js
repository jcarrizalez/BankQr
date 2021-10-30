/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import messaging from '@react-native-firebase/messaging';

import admob, {MaxAdContentRating, BannerAd, TestIds, BannerAdSize ,InterstitialAd, RewardedAd, AdEventType} from '@react-native-firebase/admob';


export const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

export const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const Banner = ({onLoaded, onError,size=null}) =>{
  var size_ = BannerAdSize.ADAPTIVE_BANNER;
  size_ = '468x60';
  size_ = '320x50';
  if(size==='full'){
    size_ = BannerAdSize.FULL_BANNER;
    size_ = '320x50';
  }
  else if(size==='lansp'){
    size_ = '300x250';
  }
  
  return <BannerAd
    unitId={TestIds.BANNER}
    size={size_}
    //size='320x100'
    requestOptions={{
      requestNonPersonalizedAdsOnly: true,
    }}

    //onAdClosed={(data) => console.log('onAdClosed',data)}
    //onAdOpened={(data) => console.log('onAdOpened',data)}
    //onAdLeftApplication={(data) => console.log('onAdLeftApplication',data)}
    //onAdLoaded={(data) => console.log('onAdLoaded',data)}
    //onAdFailedToLoad={(data) => console.log('onAdFailedToLoad',data)}

    
    //onAdLoaded={onLoaded?onLoaded:null}
    //onAdFailedToLoad={(error) => onError?onError(error):null}
  />;
}

const App: () => React$Node = () => {

  //Notificaciones
  useEffect(() => {
    // Register background handler
    const background = messaging().setBackgroundMessageHandler(async remoteMessage => {
      //redux.push('notification',remoteMessage);
    });

    // Register foreground handler
    const foreground = messaging().onMessage(async remoteMessage => {
      //redux.push('notification',remoteMessage);
    });

    return ()=> {
      //background();
      foreground();
    }
  }, []);
  useEffect(() => {
    admob().setRequestConfiguration({
      // Update all future requests suitable for parental guidance
      maxAdContentRating: MaxAdContentRating.PG,
      // Indicates that you want your content treated as child-directed for purposes of COPPA.
      tagForChildDirectedTreatment: true,
      // Indicates that you want the ad request to be handled in a
      // manner suitable for users under the age of consent.
      tagForUnderAgeOfConsent: true,
    })
    .then(() => {
      // Request config successfully set!
    });
  }, []);

  useEffect(() => {
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        interstitial.show();
      }
    });

    interstitial.load();

    // Unsubscribe from events on unmount
    return () => eventListener();
  },[]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <Banner />

          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step Ones </Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    backgroundColor: 'red',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
