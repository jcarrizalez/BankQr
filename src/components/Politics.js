import React,{useEffect, useCallback} from 'react';
import {View, Text, SafeAreaView, ScrollView, Linking, toast} from '../lib/react-native';
import { defaultNavigationOptions } from '../lib/navigation';
import {Banner} from './Firebase';
import {WebView} from 'react-native-webview';
import Item from './Item';
import styles from '../styles';
import {redux} from '../store';

const Politics = () => {

	var html  = "<br />La presente Política de Privacidad establece los términos en que usa y protege la información que es proporcionada por los usuarios al momento de nuestra aplicación móvil. Esta empresa está comprometida con la seguridad de los datos de sus usuarios. Cuando se solicita llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo, esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios. Todo cambio de las políticas se informarán para que sean nuevamente aprobadas.";
	html  += "<br /><br /><b>Datos que son recogidos</b>";
	html  += "<br /><br />Nuestra aplicación podrá recoger datos personales: Documento de identificación, números de teléfonos, nombre del banco, pin de acceso, pregunta y respuesta de seguridad. Pero se aclara que los datos no son almacenados en nuestros servidores, son almacenados en el mismo dispositivo del usuario bajo mecanismos de cifrado de datos de última generación, para garantizar que no se compromete la seguridad del usuario.";
	html  += "<br /><br /><b>Uso de la datos recogidos</b>";
	html  += "<br /><br />Nuestra aplicación emplea los datos con el fin procesar las distintas solicitudes que requiera el usuario y mantener un registro de actividades, ofrecer una registro de pagos frecuentes, el pin de acceso y la pregunta y respuesta de seguridad correctamente cifrada. Todos los datos recogidos serán para uso interno de la aplicación, y bajo ninguna circunstancia, serán compartidos con fuentes externas o darle otros usos que no estén especificados en este documento. Los datos más sensibles son cifrados y garantizamos que no pueden ser extraídos por aplicaciones de terceros.";
	html  += "<br /><br /><b>Cookies</b>";
	html  += "<br /><br />Una cookie se refiere a un fichero que es guardado internamente en su dispositivo con la finalidad de almacenar información relevate, la cual puede ser usada de forma continua en nuestra aplicación.";
	html  += "<br /><br />Nuestra aplicación no hace uso de cookies, todas las operaciones se realizan en memoria y es eliminada cuando finaliza el proceso.";
	html  += "<br /><br /><b>Permisos requeridos por la aplicación</b>";
	html  += "<br /><br />Los permisos que se requieren para ciertas operaciones especiales son de lectura y escritura en el almacenamiento, lectura de contactos, uso de la cámara y envío de SMS. Los permisos son solicitados en tiempo de ejecución";
	html  += "<br /><br /><b>Cámara:</b> Para ser usada como escaner de códigos QR.";
	html  += "<br /><br /><b>SMS:</b> Para poder enviar los mensajes automatizados. Sólo es necesario cuando el método de envío de las solicitudes es automatizado.";
	html  += "<br /><br /><b>Enlaces a Terceros</b>";
	html  += "<br /><br />Nuestra aplicación contiene enlaces a otros sitios que pudieran ser de su interés (la publicidad mostrada en la aplicación). Una vez que usted de seleccione alguno de estos enlaces, estará abandonando nuestra aplicación, y no tendremos control sobre el sitio o aplicación al que es redirigido, por lo tanto, no nos responsabilizamos de su privacidad ni de la protección de sus datos de esos sitios de terceros. Sin embargo, estos sitios están sujetos a sus propias políticas de privacidad, y recomendamos que la consulte para corroborar que usted está de acuerdo.";
	html  += "<br /><br /><b>Aviso legal</b>";
	html  += "<br /><br />Ésta es una aplicación NO OFICIAL y nuestra intención es ofrecer un servicio para facilitar el uso de la Plataforma P2P Intercambiaria. La aplicación toma los datos ingresada por el usuario y los ordena según la sintáxis de cada institución bancaria y envía dicha solicitud por mensaje de texto (SMS) a la institución bancaría del usuario. La institución bancaria recibe la solicitud y la procesa (aprueba o rechaza) y notifica el resultado de la operación directamente al usuario sin pasar por nuestra aplicación para garantizar la privacidad entre la institución y el usuario. Recomendamos consultar el estado de cuenta para verificar que las operaciones realizadas corresponden con las que ha autorizado. No dependemos de ninguna institución bancaria, ni mantenemos relación directa con las mismas. Si llegaran a existir pagos no reconocidos, debe reportarlos de inmediato a su institución bancaria con las pruebas pertinentes.";
	html  += "<br /><br /><b>Publicidad</b>";
	html  += "<br /><br />Esta aplicación muestra publicidad ofrecida por los servicios de Google Admob con el fin de monetizar el uso de la misma, y así poder mantener el desarrollo de este servicio. La publicidad es colocada directamente por Google Admob y no tenemos acceso directo a ello, por lo cual ellos deciden cuando y cuál mostrar.";
	html  += "<br /><br /><b>Comisión bancaria</b>";
	html  += "<br /><br />Los pagos Persona a Persona (P2P), generan 0,3% del monto a pagar, con una comisión mínima de Bs 110,00. Y el banco cobrará Bs 110,00 por las transacciones rechazadas y/o reversadas.";
	html  += "<br /><br />Los pagos Persona a Comercio (P2C), generan 1,5% del monto a pagar, con una comisión mínima de Bs 920,00. Y el banco cobrará Bs 920,00 por las transacciones rechazadas y/o reversadas.";
	html  += "<br /><br />Esta comisión es cobrada por el banco del emisor del pago. Nuestros servicios son completamente gratuitos y no cobramos ningún tipo de comisión adicional.";
	html  += "<br /><br /><b>Costo del mansaje de texto (SMS)</b>";
	html  += "<br /><br />La operadora telefónica es la encargada de generar el cobro por envío de SMS. La operadora cobrará el costo básico + IVA (Cada usuario deberá consultar su operadora).";
	html  += "<br /><br /><b>Control de su información personal</b>";
	html  += "<br /><br /><b>BankQr</b> no cederá, distribuirá ni venderá los datos del usuario que han sido cargados en la App ya que son almacenados solo de forma local. De igual manera, no almacenamos en nuestros servidores dato alguno del usuario.";
	html  += "<br /><br /><b>BankQr</b> se reserva el derecho de cambiar los términos de la presente política de privacidad en cualquier momento, pero será notificado a los usuarios para que aprueben los cambios realizados o los rechacen.";
	html  += "<br /><br /><br /><br />";

	return (
		<WebView
	  		style={{ padding: 15}}
		    originWhitelist={['*']}
		    source={{ html: '<div style="color: gray; text-align:justify; font-size:30px">'+html+'</div>' }}
		/>
	);
}

export default {
  screen: Politics,
  path: 'Politics/:name',
  navigationOptions: ({ navigation }) => ({
    ...defaultNavigationOptions,
      title: 'Politicas',
  }),
}
