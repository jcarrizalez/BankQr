import {LogBox, YellowBox, ToastAndroid } from "react-native";
export { 
	AppRegistry,
	Platform, Dimensions, DeviceEventEmitter, StatusBar,
	FlatList, SafeAreaView, ScrollView, View, TextInput, Text, Image,
	Alert, TouchableHighlight
}  from "react-native";

export const toast = message => ToastAndroid.show(message, 5000);

export const ignoreWarnings = ()=> YellowBox.ignoreWarnings([
	'Warning: ...',
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillUpdate is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Warning: componentWillReceiveProps has been renamed',
    'Require cycle:',
    'Require cycles are allowed, but can result in uninitialized values',
]);