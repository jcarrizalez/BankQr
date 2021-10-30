import React, {useEffect, useState, useRef} 	from 'react';
import { Linking, toast } from '../lib/react-native';
import {redux} from '../store';
import {dynamicLinks as dynamicLinks_, messaging, admob, MaxAdContentRating, BannerAd, TestIds, BannerAdSize ,InterstitialAd, RewardedAd, RewardedAdEventType, AdEventType } from '../lib/firebase';
import {uuidv4, parse, stringify, object, objectDecode } from '../functions';

var dev = __DEV__ ? true : false;

dev = false;

const adInterstitialId = dev? TestIds.INTERSTITIAL : 'ca-app-pub-6394919654745152/9412419922';
const adRewardedId = dev? TestIds.REWARDED : 'ca-app-pub-6394919654745152/3282125840';
const adBannerId = dev? TestIds.BANNER : 'ca-app-pub-6394919654745152/5451952630';

export default function Load(){
	
	//Notificaciones
	useEffect(() => {
		const message = async remoteMessage => redux.push('notification',remoteMessage);
		// Register background handler
		const background = messaging().setBackgroundMessageHandler(message);
		// Register foreground handler
		const foreground = messaging().onMessage(message);
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
			tagForChildDirectedTreatment: false,
			// Indicates that you want the ad request to be handled in a
			// manner suitable for users under the age of consent.
			tagForUnderAgeOfConsent: true,
		})
		.then(() => {
			console.log('is admob')
			// Request config successfully set!
		});
	}, []);
	/**/
	
	useEffect(() => {
		const handleDynamicLink = link => {
			console.log('1',link)
		    // Handle dynamic link inside your own application
		    if (link.url === 'https://invertase.io/offer') {
		      // ...navigate to your offers screen
		    }
		};
		const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
		// When the component is unmounted, remove the listener
		return () => unsubscribe();
	}, []);
	
	useEffect(() => {
		const getUrlAsync = async () => {
	      // Get the deep link used to open the app
	      const initialUrl = await Linking.getInitialURL();
	      if(initialUrl!==null){
	      	var data = initialUrl.split('?');
	      	var obj=null;
	      	if(data.length===3){
	      		console.log('>>>>>')
	      		obj = objectDecode(initialUrl);
	      	}
	      	else{
	      		console.log('<<<<<')
	      		obj = objectDecode(data[1], data[0]);
	      	}
	      	console.log(obj)
	      	if(obj===null){
	      		toast('Error en Lectura de URL');
	      	}
	      	else if(typeof obj==='object'){
	      		if(obj.amount){
	      			redux.push('route', {component:'SendPaymentByQr',data:initialUrl});
	      			//setTimeout(()=> {
					//}, 500);
	      		}
	      		else{
	      			let remote_payments = redux.get('remote_payments');
	      			let accounts = redux.get('accounts');
	      			if(!remote_payments || !accounts) return null;

	      			console.log(accounts)
	      			let remote_payment = remote_payments.find(item=>item.number===obj.number && item.phone===obj.phone && item.document===obj.document);
	      			let account = accounts.find(item=>item.number===obj.number && item.phone===obj.phone && item.document===obj.document);
	      			if(remote_payment){
	      				toast('Esta Cuenta Ya Existe');
	      			}
	      			else if(account){
	      				toast('Error: Esta Url ya estaba en Mis Cuentas');
	      			}
	      			else{
	      				obj.id = uuidv4();
	      				remote_payments.push(obj);
	      				redux.push('remote_payments',remote_payments,true);
	      				toast('Cuenta Agregada a Pago Remoto');
	      				redux.push('navigate', 'RemotePayments');
	      			}
	      			//setTimeout(()=> {
	      			//}, 200);
	      		}
	      	}
	      	/*
	      	setTimeout(()=>{
		      	redux.push('navigate', 'RemotePayments');
			}, 100);
	      	setTimeout(()=>{
				redux.push('route', {
				    component:'RemotePayment',
				    data:initialUrl
			    });
			}, 300);
			*/
	      }
	    };
	    getUrlAsync();
	    //dynamicLinks().getInitialLink().then(link => link?getUrlAsync():null);

  	}, []);

	return <Advertising />;
}


export const Banner = ({onLoaded, onError,size=null}) =>{
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
		unitId={adBannerId}
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
/*
export const interstitialLoad = () => interstitial.load();

export const interstitialOnAdEvent = () => interstitial.onAdEvent(type => {
		console.log(type, AdEventType.LOADED);
      if (type === AdEventType.LOADED) {
        interstitial.show();
      }
      
      if (type === AdEventType.CLOSED) {
        console.log("ad CLOSED");
        eventListener()
        //interstitial.load();
      }
      
});*/

const change = () =>{
	let score = redux.get('score');
	score = (score>20)? 20 : score;
	score = (score + 1);
	redux.push('score', score, true);
}
			
			
const Advertising = () => {

	const [date, setDate] = useState(new Date('2021-01-01'));

	const rewardedAdRef = useRef(RewardedAd.createForAdRequest(adRewardedId));
	const [adLoadedRewarded, setAdLoadedRewarded] = useState(false);

	const interstitialAdRef = useRef(InterstitialAd.createForAdRequest(adInterstitialId, {
	requestNonPersonalizedAdsOnly: true,
	keywords: ['fashion', 'clothing'],
	}));
  	const [adLoadedInterstitial, setAdLoadedInterstitial] = useState(false);

	useEffect(() => {
		const eventListener = interstitialAdRef.current.onAdEvent(type => {
			if (type === AdEventType.LOADED) {
				setAdLoadedInterstitial(true);
			}
			else if(type === AdEventType.CLOSED) {
				setAdLoadedInterstitial(false);
				interstitialAdRef.current.load();
			}
		});
		interstitialAdRef.current.load();
		return () => eventListener();
	}, []);

	useEffect(() => {
		const eventListener = rewardedAdRef.current.onAdEvent((type) => {
			if(type==='rewarded_loaded'){
				setAdLoadedRewarded(true);
			}
			else if(type==='closed'){
				setAdLoadedRewarded(false);
				rewardedAdRef.current.load();
			}
			else if(type==='rewarded_earned_reward'){
				change();
			}
		});
		// Start loading the interstitial straight away
		rewardedAdRef.current.load();
		// Unsubscribe from events on unmount
		return () => eventListener();
	}, []);

	useEffect(() => {
		//redux.push('score', 0, true);
		const show = type => {
			var newdate = new Date();
			if(type==='addAdmobRewarded'){
				if(adLoadedRewarded){
					try {
						rewardedAdRef.current.show();
					}
					catch (error) {
						toast('Error en Publicidad');
					}
				}
			}
			else if(date<newdate){
				if(type==='admobRewarded'){
					try {
						rewardedAdRef.current.show();
					}
					catch (error) {
						//toast('Error en Publicidad');
					}
				}
				else if(type==='admobInterstitial'){
					try {
						interstitialAdRef.current.show();
					}
					catch (error) {
						//toast('Error en Publicidad');
					}
				}
			}
			newdate.setMinutes( newdate.getMinutes() + 1 );
			setDate(newdate)
		}

		const unsubscribe = redux.subscribe( () => {
			if(adLoadedRewarded && redux.is('admobRewarded')){
				show('admobRewarded');
		    }
		    else if(adLoadedRewarded && redux.is('addAdmobRewarded')){
				show('addAdmobRewarded');
		    }
		    else if(adLoadedInterstitial && redux.is('admobInterstitial')){
		    	show('admobInterstitial');
		    }
		});
		return () => unsubscribe();
	},[adLoadedRewarded, adLoadedInterstitial]);
  /*
  useEffect(() => {
  	if(adLoaded) rewardedAdRef.current.show()
  }, [adLoaded]);
  */
  return null;
}

export const dynamicLinks = dynamicLinks_;
