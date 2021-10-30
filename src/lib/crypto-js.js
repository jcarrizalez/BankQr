import CryptoJS from "react-native-crypto-js";

const password = 'secret@2810&&qwert';

export const encrypt = text => CryptoJS.AES.encrypt(text, password).toString();

export const decrypt = text => {
	let bytes  = CryptoJS.AES.decrypt(text, password);
	return bytes.toString(CryptoJS.enc.Utf8);
}