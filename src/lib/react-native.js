import {LogBox, YellowBox, ToastAndroid } from "react-native";
export { 
	AppRegistry, StyleSheet, Linking, Clipboard, Share, PermissionsAndroid,
	Platform, Dimensions, DeviceEventEmitter, StatusBar,Button, BackHandler,
	FlatList, SafeAreaView, ScrollView, View, TextInput, Text, Image,
	Alert, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback
}  from "react-native";

export const toast = message => ToastAndroid.show(message, 5000);

export const ignoreWarnings = ()=> YellowBox.ignoreWarnings([
	'Warning: ...',
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillUpdate is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Warning: componentWillReceiveProps has been renamed',
    'registerHeadlessTask or',
    'registerCancellableHeadlessTask',
    'Require cycle:',
    'Require cycles are allowed, but can result in uninitialized values',
]);