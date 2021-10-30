import {Platform, PermissionsAndroid, toast} from './lib/react-native';

const permissions = [
    PermissionsAndroid.PERMISSIONS.INTERNET,
    PermissionsAndroid.PERMISSIONS.VIBRATE,
    PermissionsAndroid.PERMISSIONS.WRITE_SMS,
    PermissionsAndroid.PERMISSIONS.READ_SMS,
    PermissionsAndroid.PERMISSIONS.SEND_SMS,
    PermissionsAndroid.PERMISSIONS.CAMERA
].filter(item=>item!==undefined);

export const checkPermission = () => {
	/*
	console.log(permissions)
	try {
        // Tipo de promesa de devolución
        const granted = PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        )
        granted.then((data)=>{
            console.log("Ya sea para obtener permisos de lectura y escritura"+data)
        }).catch((err)=>{
            console.log(err.toString())
        })
    } catch (err) {
        console.log(err.toString())
    }
    */
}

// Solicitar múltiples
export async function requestMultiplePermission() {
    try {
        const granteds = await PermissionsAndroid.requestMultiple(permissions)
     	// Return es el tipo de objeto
        var data = "¿Está de acuerdo con los permisos de dirección:"
        if (granteds["android.permission.SEND_SMS"] === "granted") {
            data = data + "Si n"
        } else {
            data = data + "No"
        }
        data = data+"¿Estás de acuerdo con los permisos de la cámara?"
        if (granteds["android.permission.CAMERA"] === "granted") {
            data = data + "Si n"
        } else {
            data = data + "No"
        }
        data = data+"¿Aceptas los permisos de almacenamiento?"
        if (granteds["android.permission.WRITE_SMS"] === "granted") {
            data = data + "Si n"
        } else {
            data = data + "No"
        }
    } catch (err) {
        toast(err.toString())
    }
}