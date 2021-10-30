import React,{useEffect, useCallback} from 'react';
import {View, Text, SafeAreaView, ScrollView, Linking, toast} from '../lib/react-native';
import { defaultNavigationOptions } from '../lib/navigation';
import {Banner} from './Firebase';
import {WebView} from 'react-native-webview';
import Item from './Item';
import styles from '../styles';
import {redux} from '../store';

const Terms = () => {

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


var html  = "<br /><b>BankQr</b> es una aplicación Android, desarrollada para facilitar el uso del canal SMS de la plataforma P2P y P2C Interbancaria dentro de la República Bolivariana de Venezuela. Integra los bancos que ofrecen el servicio de Pago Móvil por mensajes de texto desde una sola aplicación.";
	html  += "<br /><br />¿Cómo funciona <b>BankQr</b> y hasta qué punto interviene <b>BankQr</b> en el Pago Móvil SMS?";
	html  += "<br /><br />El funcionamiento de Pago Móvil es simple:";
	html  += "<br /><br /><b>Para pagar:</b>";
	html  += "<br /><br /><b>1.</b> El usuario envía una solicitud de pago al banco a través de un mensaje de texto, asistido por <b>BankQr</b>.";
	html  += "<br /><br /><b>2.</b> El banco recibe la solicitud, la procesa (aprueba o rechaza) y le informa al usuario el resultado de la operación vía SMS, sin pasar por BankQr para garantizar la privacidad entre el banco y el usuario.";
	html  += "<br /><br /><b>Para la recepción de pagos:</b>";
	html  += "<br /><br /><b>1.</b> El beneficiario suministra al emisor del pago la siguiente información: Documento de identificación, número de teléfono afiliado a Pago Móvil y el nombre del banco.";
	html  += "<br /><br /><b>2.</b> El emisor realizar el pago, conforme a lo descrito a los pasos para pagar.";
	html  += "<br /><br /><b>3.</b> El banco recibe el pago, lo acredita en la cuenta del beneficiario y le debe informar que recibió un pago.";
	html  += "<br /><br /><b>Nota:</b> El emisor y el receptor deben estar afiliados a Pago Móvil desde sus bancos. Todas las operaciones bancarias se realizan vía mensaje de texto, por lo cual no se requiere de Internet para dichas operaciones.";
	html  += "<br /><br /><b>BankQr</b> asiste al usuario solicitándole los datos básicos para el pago y no tenga que memorizarse los complejos formatos para cada tipo de solicitud de los bancos que posea. Y minimizar los errores con el orden de los parámetros, códigos de los bancos y sintaxis propia de cada tipo de solicitud.";
	html  += "<br /><br /><b>BankQr</b> garantiza que la solicitud enviada tendrá el formato exigido por el banco de acuerdo al tipo de solicitud, así como también, de enviarla al número correcto según el banco y operadora telefónica.";
	html  += "<br /><br /><b>¿Quiénes pueden usar la aplicación?</b>";
	html  += "<br /><br /><b>1.</b> Toda persona natural o jurídica que posea cuenta en los bancos que ofrecen el servicio de Pago Móvil por mensaje de texto, residentes en la República Bolivariana de Venezuela y que se haya afiliado al canal SMS del servicio Pago Móvil de su banco.";
	html  += "<br /><br /><b>2.</b> Posea un dispositivo con sistema operativo <b>Android 4.0 sdkVersion>=16</b> o superior que pueda enviar mensajes de texto.";
	html  += "<br /><br /><b>3.</b> Haya leído y aceptado los presentes Términos y condiciones y la Política de privacidad.";
	html  += "<br /><br /><b>¿Qué permisos requiero otorgar y por qué?</b>";
	html  += "<br /><br />Los permisos que se requieren son los de teléfono, cámara, SMS. el usuario debe asignar los persimos qué se requieren y podrá rechazarlo sí así lo desea.";
	html  += "<br /><br /><b>Cámara:</b> Para ser usada como escaner de códigos QR.";
	html  += "<br /><br /><b>SMS:</b> Para poder enviar las distintas solicitudes en el modo de automatizado, no se requiere para el modo de envío manual.";
	html  += "<br /><br /><b>¿Cuánto cuesta usar BankQr?</b>";
	html  += "<br /><br /><b>BankQr</b> no cobra ningún tipo de comisión por su uso, es completamente gratuita.";
	html  += "<br /><br />Los bancos cobran comisiones dependiendo del tipo de solicitud que envíe el usuario (Consultar los términos y condiciones que aceptaron en el banco al afiliarse a Pago Móvil).";
	html  += "<br /><br />El costo del mensaje es de tipo premium (número corto) y es cobrado por la operadora telefónica que use el usuario (Consultar con la operadora el costo del mensaje, debe indicarle el número ya que varían los costos).";
	html  += "<br /><br /><b>¿Cómo recibir asesoría?</b>";
	html  += "<br /><br />Los usuarios de <b>BankQr</b> cuentan con un canal de atención desde la misma aplicación para orientarles en la afiliación a Pago Móvil desde sus bancos (brindamos las mismas instrucciones que publican las entidades bancarias a través de sus portales web), orientarles sobre el uso y navegación de la aplicación <b>BankQr</b>, orientarles a corregir problemas de configuración con sus dispositivos, orientarles a analizar las respuestas que le devuelven los bancos cuando existe algún inconveniente al procesar los pagos, etc.";
	html  += "<br /><br />De igual modo, ofrecemos múltiples canales de contacto, como es WhatsApp, Telegram, Twitter, Instagram, mensajes de texto, llamadas telefónicas, correo electrónico.";
	html  += "<br /><br />Bajo ninguna circunstancia solicitamos datos sensibles al usuario (número de cédula, nombre, dirección, números de cuenta, claves o contraseñas), de igual manera, no asistimos a la afiliación ni a realizar las operaciones bancarias, damos las instrucciones y es el mismo usuario el que hace las operaciones.";
	html  += "<br /><br /><b>¿Hasta dónde llega la responsabilidad de BankQr?</b>";
	html  += "<br /><br /><b>BankQr</b> no se hace responsable por el mal uso que le den a aplicación, cada usuario es responsable de los pagos que se realicen desde su dispositivo.";
	html  += "<br /><br />Para aumentar la seguridad <b>BankQr</b> cuenta con control de acceso y PIN  de seguridad, en caso de olvidar el PIN, lo recomendable es desistalar la app y volver a instalar, no pedimos pregunta de seguridad para este paso ya que la perdida del dispositivo o robo no dar opción a desbloqueo.";
	html  += "<br /><br />De igual manera cuenta con un registro de actividades donde se refleja absolutamente todo lo que haga dentro de <b>BankQr</b>.";
	html  += "<br /><br />Si llegaran a existir pagos no reconocidos, debe reportarlos de inmediato a su entidad bancaria con las pruebas pertinentes. Nuestra aplicación es completamente audítale.";
	html  += "<br /><br /><b>BankQr</b> no depende de ninguna entidad bancaria, ni es intermediario en el proceso de afiliación. De igual modo, no es responsable de la aprobación o rechazo de las solicitudes de pago, es responsabilidad de la entidad bancaria, así como el de notificar el resultado de las operaciones.";
	html  += "<br /><br />Los nombres comerciales son usados únicamente para orientar al usuario en el uso de la aplicación, pertenecen a cada entidad bancaria, respetando sus derechos al no modificarlos ni deformarlos, en caso de que esto ocurra y haber recibido la notificación, se hará la corrección inmediata del mismo.";
	html  += "<br /><br />Al usar la aplicación, los usuarios aceptan estos términos y condiciones en su totalidad.";
	html  += "<br /><br /><b>Contra el fraude</b>";
	html  += "<br /><br />En <b>BankQr</b> nos gusta el juego limpio y mantenemos la transparencia de nuestros procesos. Nuestra plataforma consta de mecanismos antifraude de vigilancia permanente.";
	html  += "<br /><br />Los casos donde se compruebe que algún usuario incurra en actos fraudulentos o represente un riesgo para nuestra aplicación u otros usuarios, el dispositivo será vetado de la aplicación <b>BankQr</b> definitivamente.";
	html  += "<br /><br /><b>Autoridad de BankQr</b>";
	html  += "<br /><br /><b>BankQr</b> podrá bloquear, suspender y/o vetar a cualquier usuario, que viole las normas establecidas, falte el respeto a los analistas de atención al cliente, de mal uso del canal de atención o trate de vulnerar nuestra seguridad y la de nuestros usuarios.";
	html  += "<br /><br /><b>BankQr</b> podrá cambiar en cualquier momento y sin previo aviso, los términos y condiciones que rigen la aplicación.";
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
  screen: Terms,
  path: 'Terms/:name',
  navigationOptions: ({ navigation }) => ({
    ...defaultNavigationOptions,
      title: 'Terminos y Condiciones',
  }),
}
