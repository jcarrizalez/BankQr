import { StyleSheet }  from "react-native";

var styles = {
  InputSelect:{},
  Account:{},
	Accounts:{},
	AccessControl:{},
	Home:{},
  AdvertisingBar:{},
	Bottom:{},
	Calculator:{},
	Help:{},
	HowDoesItWork:{},
	Item:{},
	ReadCodeQr:{},
	RemotePayment:{},
	RemotePayments:{},
	Add:{},
	SendPaymentByQr:{},
	ShowCodeQr:{},
  Story:{},
};

const flex = 1;
const display = 'flex';
const width = '100%';
const position = 'absolute';
const justifyContent = 'space-between';
const flexDirection = 'row';

const textAlias = {
  color: "red", 
  fontSize: 11,
  alignItems: "flex-start", 
  marginLeft: 10
}
const textInput = {
  width,
  padding: 10,
  paddingBottom: 0,
  borderBottomWidth:1,
  borderColor:'gray',
  borderTopRightRadius:3,
  borderTopLeftRadius:3,
  marginTop:5,
  backgroundColor: '#FFFFFF',
  fontSize: 15,
}

const textTitle = {
  color: "black", 
  fontSize: 12,
  alignItems: "flex-start", 
}
const inputColumn = {
  display,
  justifyContent,
  flexDirection: 'column',
  width,
  paddingHorizontal: 5,
}
  
const inputRow = {
  display,
  justifyContent,
  flexDirection,
  width,
}
const simple = {
  height: 50,
}
const banner = {
  display,
  justifyContent:'center',
  alignItems: 'center',
}
const area = {
  flex,
  flexDirection: 'column',
  justifyContent:'center',
  alignItems:'center',
  borderWidth:.5,
  marginTop:20,
  marginBottom:0,
  marginHorizontal:2,
  borderColor:'gray',
  borderRadius:5,
  backgroundColor: '#FFFFFF',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity:  0.4,
  shadowRadius: 5,
  elevation: 2,
  paddingHorizontal:5,
};


//###########################################################

styles.InputSelect.portrait = {
  scrollViewItem: {
    /*
    width:'100%',
    top:43,
    left:5,
    backgroundColor:'white',
    position:'absolute',
    */
    borderColor:'#D5D5D5',
    borderBottomWidth:.5,
  },
  itemText:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    height:40,
    borderBottomWidth:.5,
    borderColor:'#D5D5D5',
  },
  textItemName:{
    marginLeft:10,
    color: "gray", 
  },
  textItemNumber:{
    color: "#E9E9E9",
    marginRight:10,
  },
};
styles.InputSelect.landscape = styles.InputSelect.portrait;


//###########################################################

//###########################################################

styles.Account.portrait = {
  area,
  scrollView: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  content:{
    flex:1,
    display, justifyContent, flexDirection: 'column',
    backgroundColor: '#E9E9E9',
  },
  title:{
    fontWeight: "bold",
    fontSize: 15,
  },
  inputRowConf:{ 
    display,justifyContent,flexDirection, width,
    paddingHorizontal: 5,
    paddingVertical:10,
  },
  inputRow,
  inputColumn,
  textInput,
  textTitle,
  textAlias,
  textTitleConf:{
    color: "black", 
    fontSize: 13,
    alignItems: "flex-start", 
    marginTop:2,
  },
  simple,
  banner,
  touchRemove:{
    marginRight:15,
    width:40,
    display,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
  },
};
styles.Account.landscape = styles.Account.portrait;


//###########################################################

var content = {
  flex,
  justifyContent,
  flexDirection: 'column',
};
var justify = {
  justifyContent:'center',
  alignItems: 'center',
};

styles.Accounts.portrait = {
  content,
  item: {
    ...content,
    paddingTop: 10,
    borderBottomWidth:.5,
    borderColor:'#f0f4f7',
  },
  itemIcon:{
    position,
    right:10,
    top:12,
  },
  bank:{
    paddingLeft: 15,
    paddingBottom: 10,
  },
  simple,
  banner,
  bank_name:{
    fontSize: 22,
  },
  bank_title:{
    fontSize: 10,
    color:'gray',
  },
  status:{
    position,
    right:10,
    bottom:0,
    flexDirection,
    paddingBottom: 0,
  },
  on:{
    fontSize: 12,
    fontWeight: "600",
    color:'green',
    marginHorizontal:10
  },
  scrollView: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
};
styles.Accounts.landscape = styles.Accounts.portrait;

//###########################################################

styles.AccessControl.portrait = {
  AccessControl:{
    position:'absolute', zIndex:1000,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'100%', height:'100%', 
  },
  content:{
    backgroundColor: 'black',
    opacity:.7,
    width:'100%', height:'100%', 
  },
  modal:{
    position:'absolute', zIndex:1001,
    backgroundColor: 'white',
    width:300, height:180,
    borderRadius:5,
    elevation:4,
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
  },
  header:{
    height:40,
    width:'100%',
    display:'flex',
    backgroundColor:'orange',
    justifyContent:'center',
    alignItems:'center',
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    borderBottomWidth:1,
    borderColor:'gray'
  },
  title:{
    fontSize:20,
    color:'white'
  },
  textInput:{
    width:260,
    fontSize:50,
    paddingLeft:20,
    marginLeft:30,
  },
  inputColumn,
  inputRow:{
    ...inputRow,
    width:300,
  },
  footer:{
    height:50,
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    borderBottomLeftRadius:5,
    backgroundColor:'orange',
    borderBottomRightRadius:5,
    borderTopWidth:1,
    borderColor:'gray'
  },
  touchCancel:{
    width:'45%',
    borderRightWidth:1,
    borderColor:'gray'
  }
};

styles.AccessControl.landscape = styles.AccessControl.portrait;

//###########################################################

styles.Home.portrait = {
  header:{
    display,
    justifyContent,
    flexDirection,
    height:80,
    width: '100%',
    backgroundColor: 'orange',
  },
  barra:{
    position: 'absolute',
    top:2,
    right:10,
    width:100,
    height:10,
    backgroundColor: 'red',
    borderColor:'#FFFFFF',
    borderWidth:1,
    borderRadius:4,
    shadowColor: 'blue',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.26,
    // No options for shadow color, shadow offset, shadow opacity like iOS
    elevation: 1,
  },
  payer:{
    position,
    bottom:45,
    right:10
  },
  collector:{
    position,
    bottom:10,
    right:10
  },
  payerText1:{
    marginTop:15,
    fontSize:9,
    color:'white',
    position,
    right:0
  },
  collectorText1:{
    marginTop:15,
    fontSize:9,
    color:'white',
    position,
    right:0
  },
  payerText2:{
    fontSize:14,
    fontWeight: "bold",
    color:'white'
  },
  collectorText2:{
    fontSize:14,
    fontWeight: "bold",
    color:'white'
  },
  collectorText3:{
    fontSize:20,
    right:0,
    bottom:-13,
    position,
    fontWeight: "bold",
    color:'white'
  },
  load:{
    flex,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'orange',
    position:'absolute',
    width:'100%',
    height:'100%',
    zIndex:1,
  },
  logoLoad:{
    display,
    width:108,
    height:103,
    backgroundColor: 'orange',
  },
  imageLogoLoad:{
    width:108,
    height:103,
    resizeMode: 'stretch'
  },
  nameTextLoadFrom:{
    color:'white',
    position,
    fontSize:14,
    opacity:.8,
    bottom:100
  },
  nameTextLoadFromMail:{
    color:'white',
    position,
    fontSize:20,
    bottom:70
  },
  logo:{
    display,
    height:90,
    width:90,
    backgroundColor: 'orange',
    marginTop: 18,
    marginLeft: 24.5,
    borderRadius:45,
  },
  imageLogo:{
    width:48,
    height:43,
    resizeMode: 'stretch'
  },
  imageOnda:{
    width:'100%',
    height:43,
    resizeMode: 'stretch'
  },
  name:{
    display,
    position,
    marginTop: 55,
    marginLeft: 24,
  },
  name2:{
    display,
    position,
    marginTop: 55,
    marginLeft: 24,
  },
  nameText:{
    fontSize:20,
    fontWeight: "bold",
    color:'white'
  },
  footer:{
    display,
    alignItems: 'center', 
    justifyContent:'center',
    height:60,
    width: '100%',
    position,
    bottom:0,
    backgroundColor: 'orange',
    backgroundColor: 'transparent',
  },
  content:{
    flex, 
    backgroundColor: '#FFFFFF',
    justifyContent,
  },
  safeAreaView:{
    flex, 
    alignItems: 'center', 
    justifyContent:'center',
    backgroundColor: 'transparent',
    marginTop:-40,
    zIndex:-1
  },
  space:{
    width:'100%',
    height:40,
    backgroundColor: '#FFFFFF',
  },
  scrollView:{
    width: '100%',
    backgroundColor: 'transparent',
    backgroundColor: '#E9E9E9',
  },
  viewVersion:{
    display,
    alignItems: 'center', 
    justifyContent: 'flex-start',
    height:90,
    width: '100%',
    backgroundColor: 'transparent',
  },
  viewFin:{
    height:10,
    width: '100%',
    backgroundColor: 'white',
    borderColor:'#E9E9E9',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
     // add shadows for iOS only
    shadowColor: 'blue',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.26,
    // No options for shadow color, shadow offset, shadow opacity like iOS
    elevation: 4,
  },
  textVersion:{
    paddingTop:10,
    fontSize:12,
    color:'#C2C2C2'
  },
};

styles.Home.landscape = styles.Home.portrait;

//###########################################################

styles.AdvertisingBar.portrait = {
  content:{
    position: 'absolute',
    top:2,
    right:10,
    width:100,
    height:10,
    backgroundColor: 'orange',
    borderColor:'#FFFFFF',
    borderWidth:1,
    borderRadius:4,
    shadowColor: 'blue',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.26,
    elevation: 1,
    display:'flex',
    flexDirection:'row',
  },
  bar:{
    borderTopLeftRadius:4,
    borderBottomLeftRadius:4,
    height:'99%',
    width:'60%',
  },
};

styles.AdvertisingBar.landscape = styles.AdvertisingBar.portrait;

//###########################################################


//###########################################################

var comun = {
  flex,
  alignItems:'center',
  justifyContent:'center',
  height:'100%',
  backgroundColor: '#FCB002'
};

styles.Bottom.portrait = {
  buttom:{
    height:65,
    flexDirection,
    alignItems: 'center',
    justifyContent,
  },
  cancel:{
    ...comun,
    borderRightWidth:.5,
    borderColor:'gray',
  },
  img:{
    width: 60, height:60, marginBottom:0
  },
  action_disabled:{
    ...comun,
    backgroundColor: '#f0f4f7',
  },
  action:{
    ...comun,
    backgroundColor: 'orange',
  },
  text:{
    fontSize:25,
  },
  text_disabled:{
    fontSize:25,
    color:'#DDE3E7'
  }
};
styles.Bottom.landscape = styles.Bottom.portrait;

//###########################################################

var calculator = {
  flex: 1,
  flexDirection: 'column',
  justifyContent:'center',
};

styles.Calculator.portrait = {
    calculator,
    area:calculator,
    touchBack:{
      marginLeft:10,
      width:40,
      display,
      height:40,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:20,
    },
    firebase:{
      paddingTop: 0,
      display,
      height: 65,
      justifyContent:'center',
      alignItems: 'center',
    },
    screen:{
      height: 150,
      width: 'auto',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    keyboard:{
      flex: 1,
      marginTop: 1,
      marginRight: .7,
      marginLeft: .7,
      borderTopWidth:.5,
      borderLeftWidth:.5,
      borderBottomWidth:.5,
      borderColor:'gray',
    },
    line:{
      flex,
      flexDirection,
      justifyContent: 'space-around',
      borderBottomWidth:.5,
      borderColor:'gray',
    },
    base:{
      flex,
      justifyContent:'center',
      alignItems: 'center',
      borderRightWidth:.5,
      borderColor:'gray',
    },
    key:{
      fontSize:25
    },
    amount:{
      marginRight: 5,
      marginBottom: 5,
      fontSize:50
    },
};
styles.Calculator.landscape = styles.Calculator.portrait;



//###########################################################

var content = {
  flex,
  justifyContent,
  flexDirection: 'column',
};
var justify = {
  justifyContent:'center',
  alignItems: 'center',
};

styles.Help.portrait = {
  content,
  item: {
    ...content,
    paddingTop: 10,
    borderBottomWidth:1,
    borderColor:'#f0f4f7',
  },
  bank:{
    paddingLeft: 15,
    paddingBottom: 10,
  },
  new:{
    flex,
    ...justify,
    paddingTop: 5,
    paddingBottom: 20,
  },
  new_title:{
    fontSize: 22,
    color:'gray',
  },
  simple,
  banner,
  bank_name:{
    fontSize: 22,
  },
  bank_title:{
    fontSize: 10,
    color:'gray',
  },
  status:{
    position,
    right:10,
    bottom:0,
    flexDirection,
    paddingBottom: 0,
  },
  title_on:{
    fontSize: 12,
    fontWeight: "600",
    color:'green',
    marginHorizontal:10
  },
  scrollView: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
};
styles.Help.landscape = styles.Help.portrait;

//###########################################################

styles.HowDoesItWork.portrait = {
	image0:{
		width:300,
		height:250,
		resizeMode: 'stretch'
	},
	image1:{
		width:260,
		height:250,
		resizeMode: 'stretch'
	},
	image2:{
		width:220,
		height:250,
		resizeMode: 'stretch'
	},
	image3:{
		width:300,
		height:250,
		resizeMode: 'stretch'
	},
  image4:{
    width:250,
    height:230,
    resizeMode: 'stretch'
  },
	configuration:{
		fontSize: 30,
		fontWeight: "bold"
	},
	description:{
		fontSize: 20,
		color: 'gray',
		fontWeight: "normal",
		flex: 1,
		justifyContent:'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10
	},
	
  viewPager: {
    flex: 1,
  },
  page: {
  	display,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  touch:{
    display,
    justifyContent:'center',
    alignItems: 'center',
    borderColor:'black',
    height:55,
    borderRadius:10,
    backgroundColor: 'orange',
  },
  touchText:{
  	fontSize:22,
  	color:'white'
  },
  footer: {
    display,
    flexDirection: 'column',
    alignItems: 'center',
    position,
    bottom:0,
    width: '100%', 
    height:0
  },
  bottom:{
  	width: '80%',
    height:55,
  	position,
    bottom:20,
    shadowColor: 'blue',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.26,
    elevation: 4,
    borderRadius:10,
  },
  circle: {
  	display,
    flexDirection,
    marginLeft: 15,
    position,
    bottom:80,
    height:20
  },
  circleItem:{
    marginRight: 10,
    borderWidth:.2,
    borderColor:'black',
    borderRadius:4,
    backgroundColor: '#f0f4f7',
    width:8,
    height:8,
  },
  circleActive:{
  	marginRight: 10,
    borderWidth:.2,
    borderColor:'black',
    borderRadius:4,
    backgroundColor: 'orange',
    width:8,
    height:8,
  }
};
styles.HowDoesItWork.landscape = styles.HowDoesItWork.portrait;


//###########################################################

styles.Item.portrait = {
  item:{
    display,
    justifyContent:'center',
    flexDirection,
    justifyContent,
    padding: 20,
    borderTopWidth:.5,
    borderBottomWidth:.5,
    backgroundColor: '#FFFFFF',
    borderColor:'#E9E9E9',
  },
  itemIcon:{
    paddingTop: 1,
  },
  viewText:{
    display,
    justifyContent: 'flex-start',
    justifyContent:'center',
    flexDirection,
  },
  itemText:{
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft:20,
    fontWeight: 'bold',
    color:'gray',
    paddingTop: 4,
    fontSize:18
  },
};
styles.Item.landscape = styles.Item.portrait;

//###########################################################

styles.ReadCodeQr.portrait = {
  touchCamera:{
    marginRight:15,
    width:40,
    display,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
  },
  area:{
    flex,
    justifyContent,
    alignItems: 'center',
    flexDirection: 'column',
  },
  firebase:{
    display,
    position,
    bottom:5,
    height: 75,
    justifyContent:'center',
  },
  read_codeqr:{
    flex,
    justifyContent,
    alignItems: 'center',
    flexDirection: 'column',
  },
  loading_text:{
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    fontSize:20,
    color: 'white',
    marginBottom:50,
  },
  code_qr:{
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
  },
  img:{
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    height:220,
    width:220,
  },
  imgImg:{
    display: 'flex',alignItems: 'center',
    justifyContent:'center',
    width: 220, height:220
  },
  info:{
    height:80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  amount:{
    fontSize:35,
  },
  text:{
    fontSize:20,
  },
  bottomC:{
    height:2,
    width: '100%',
    backgroundColor: 'white',
  },
  containerStyle:{
    flex,
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
  },
  markerStyle:{
    display: 'flex',
    borderColor: 'orange',
    borderRadius: 5,
    borderWidth:.7,
  },
  topViewStyle:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height:70,
    color: 'white',
    marginTop:0,
    zIndex:1000,
  },
  
  bottomViewStyle:{
    height:80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cameraStyle:{ 
    display: 'flex',
    width: '99.5%',
    width: 340,
    height: 290,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
};
styles.ReadCodeQr.landscape = styles.ReadCodeQr.portrait;

//###########################################################

styles.RemotePayment.portrait = {
  area,
  scrollView: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  content:{
    flex, justifyContent,
    flexDirection: 'column',
    backgroundColor: '#E9E9E9',
  },
  title:{
    fontWeight: "bold",
    fontSize: 15,
  },
  textInput,
  textTitle,
  inputColumn,
  inputRow,
  textAlias,
  simple,
  banner,
};
styles.RemotePayment.landscape = styles.RemotePayment.portrait;

//###########################################################

var content = {
  flex,
  justifyContent,
  flexDirection: 'column',
};

var justify = {
  justifyContent:'center',
  alignItems: 'center',
};
styles.RemotePayments.portrait = {
  content,
  action:{
  	marginRight:11,
  	marginBottom:5,
    borderRadius:25,
    borderWidth:.3,
    width: 50,
    height: 50,
    backgroundColor: 'white',
  },
  editIcon:{
  	position,
    right:10,
    top:5,
  },
  editText:{
  	fontSize:12,
  	color:'gray',
  	position,
    right:10,
    top:24,
  },
  deleteIcon:{
  	position,
    right:8,
    top:8,
  },
  item: {
    ...content,
    flexDirection,
    paddingTop: 5,
    borderBottomWidth:.5,
    borderColor:'#f0f4f7',
  },
  touchAdd:{
    marginRight:15,
    width:40,
    display,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
  },
  documentation:{
    display,
    width,
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  addText:{
    fontSize:20,
    marginRight:20,
  },
  image:{
    height: 120,
    width: 140,
    resizeMode: 'stretch'
  },
  
  bank:{
    paddingLeft: 15,
    paddingBottom: 10,
  },
  simple,
  banner,
  bank_name:{
    fontSize: 22,
  },
  bank_title:{
    fontSize: 15,
    color:'gray',
  },
  scrollView: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
};
styles.RemotePayments.landscape = styles.RemotePayments.portrait;


//###########################################################

styles.Add.portrait = {
  touchAdd:{
    marginRight:15,
    width:40,
    display,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
  },
  documentation:{
    display,
    width,
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
  addText:{
    fontSize:20,
    marginRight:20,
  },
  image:{
    height: 120,
    width: 140,
    resizeMode: 'stretch'
  },
};
styles.Add.landscape = styles.Add.portrait;


//###########################################################

styles.SendPaymentByQr.portrait = {
  area,
  scrollView: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  content:{
    flex:1,
    display, justifyContent, flexDirection: 'column',
    backgroundColor: '#E9E9E9',
  },
  title:{
    fontWeight: "bold",
    fontSize: 15,
  },
  inputRowConf:{ 
    display,justifyContent,flexDirection, width,
    paddingHorizontal: 5,
    paddingVertical:10,
  },
  inputRow,
  inputColumn,
  textInput,
  textTitle,
  textAlias,
  textTitleConf:{
    color: "black", 
    fontSize: 13,
    alignItems: "flex-start", 
    marginTop:2,
  },
  simple,
  banner,
  touchRemove:{
    marginRight:15,
    width:40,
    display,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
  },
  error:{
    flex,
    alignItems: 'center',
    justifyContent:'center',
  },
  error_text:{
    display: 'flex',
    fontSize:35,
    alignItems: 'center',
    justifyContent:'center',
  },
  operacion0:{
    marginTop: -20,
    fontSize:20,
  },
  operacion1:{
      fontSize:100,
  },
  /*
  scrollView: {
    marginHorizontal: 0,
    paddingHorizontal: 10,
  },

  textTitle:{
    marginTop:5,
  },

  caja:{
    paddingHorizontal: 10,
    borderWidth:1,
    borderColor:'gray',
    borderRadius:3,
    backgroundColor: '#f0f4f7',
    fontSize: 15,
  },
  caja_amount:{
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',

  },
  bank:{
    marginTop:-5,
    fontSize: 30,
    color: 'gray'
  },
  name:{
    fontSize:12,
    marginTop:-3,
    color: 'gray'
  },
  alias:{
    fontSize:12,
    marginTop:-3,
    color: 'gray'
  },
  
  content:{
    flex,
    justifyContent,
    flexDirection: 'column',
  },
  info:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  amount:{
    fontSize: 30,
    color: 'gray'
  },
  text:{
    fontSize:15,
    color:'gray',
    marginLeft:30
  },
  line:{
    flexDirection, alignItems: 'center'
  },
  line_bar:{
    flex: 1, height: 1, backgroundColor: 'black'
  },
  line_text:{
    width: 70, textAlign: 'center'
  },
  
  */
};
styles.SendPaymentByQr.landscape = styles.SendPaymentByQr.portrait;


//###########################################################

styles.ShowCodeQr.portrait = {
  show_code_qr:{
    flex,
    justifyContent,
    flexDirection: 'column',
  },
  code_qr:{
    flex,
    justifyContent:'center',
  },
  firebase:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height:65,
  },
  loading_text:{
    fontSize:15,
  },
  img:{
    flex,
    alignItems: 'center',
    justifyContent:'center',
  },
  imgImg:{
    width: '100%', height:'100%'
  },
  info:{
    height:80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  amount:{
    fontSize:35,
    fontWeight:'bold',
  },
  text:{
    fontSize:20,
    marginBottom:10,
  },
  error:{
    flex,
    alignItems: 'center',
    justifyContent:'center',
  },
  content:{
    flex,
    justifyContent,
    flexDirection: 'column',
  },
  operacion0:{
    marginTop: -20,
    fontSize:20,
  },
  operacion1:{
      fontSize:100,
  },
};
styles.ShowCodeQr.landscape = styles.ShowCodeQr.portrait;

//###########################################################

var justify = {
  justifyContent:'center',
  alignItems: 'center',
};
styles.Story.portrait = {
  touchClear:{
    marginRight:15,
    width:40,
    display,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
  },
  item:{
    display,
    justifyContent:'center',
    flexDirection,
    justifyContent,
    padding: 15,
    borderTopWidth:.5,
    borderBottomWidth:.5,
    backgroundColor: '#FFFFFF',
    borderColor:'#E9E9E9',
  },
  simple,
  banner,
   itemIcon:{
    paddingTop: 1,
  },
  viewText:{
    display,
    justifyContent: 'flex-start',
    justifyContent:'center',
    flexDirection,
  },
  itemText:{
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    top:20,
    left:50,
    fontWeight: 'bold',
    color:'gray',
    position,
    fontSize:12
  },
  itemAmount:{
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft:20,
    fontWeight: 'bold',
    color:'gray',
    marginTop: -2,
    fontSize:20
  },
};
styles.Story.landscape = styles.Story.portrait;



//###########################################################
const css = (style, portrait=false) => {
	style = styles[style];
	if(style===undefined){
		return {}
	}
	return StyleSheet.create((portrait===false)?style.landscape:style.portrait);
}
export default css;

/*
//###########################################################
styles.Story.portrait = {
};
styles.Story.landscape = styles.Story.portrait;
*/