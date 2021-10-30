export { NavigationEvents } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export const defaultNavigationOptions = {
	/*
	headerTitle: (
      <Header portrait={true} />
    ),
    */
    headerTitleAlign: 'center',
    headerTintColor:'white',
	headerTitleStyle: {
		fontWeight: 'bold',
		marginTop: 0,
	},
	headerStyle: {
		backgroundColor: 'orange',
		//marginTop:20,
		elevation: 3,
		shadowColor: 'green',
		shadowOpacity: 0,
		shadowRadius: 0,
		borderRadius:0,
		height:65,
		shadowOffset : { width: 5, height: 13, paddingTop:20},
		borderBottonWidth:1,
	},
};

export const hiddenNavigationOptions = {
	title: '',
	headerStyle:{
		height: 0
	}
};

export const AppNavigator = (components, config) => 
	createAppContainer(createStackNavigator(
	{
		...components
	},
	{
		initialRouteName: 'Home',
		defaultNavigationOptions,
		cardStack: {
			gesturesEnabled: true
		},
		modo: 'card:', // modo de cambio de página, izquierda y derecha son tarjeta (equivalente al efecto push en iOS), y arriba y abajo son modales (equivalente al efecto modal en iOS)
		headerMode: 'screen', // El modo de visualización de la barra de navegación, pantalla: tiene un efecto de transparencia degradado, flotante: sin efecto de transparencia, ninguno: oculta la barra de navegación
		...config
	}));