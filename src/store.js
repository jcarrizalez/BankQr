import {reduxjc} from './lib/redux';

import {AsyncStorage} from './lib/async-storage';

const store = AsyncStorage;

export default store;

export const redux = {
  ...reduxjc,
  push: async (key, value, use_store=false) => {
    try {
      reduxjc.push(key, value);
      if(use_store){
        await AsyncStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      // Error saving data
    }
  }
};

var account = {
  id: null,
  bank_id: null,
  name:'',
  type:null,
  type_name:'',
  payer:false,
  collector:false,
  trade:null,
  coordinates:[],
  password_temp:null,
  headline:'',
  phone: '',
  line:null,
  doc_emisor_identifier:'',
  doc_emisor:'',
};

var remote_payment = account;

export const storage = {
  link:'https://mybankqr.page.link/?link=https://mybankqr.page.link/zXbp?',
  notification:null,
  help:false,
  story:[],
  payer:undefined,
  collector:undefined,
  security:{
    password:'',
    active:false,
    /*
    menu:{
      ReadCodeQr:false,
      Calculator:false,
      RemotePayments:false,
      Story:false,
      Accounts:false,
    }
    */
  },
  password:null,
  security_question:null,
  account,
  score:0,
  accounts:[],
  remote_payment,
  remote_payments:[],
  amount:'0' // <---- lo uso tambien en app.js para validar el final de la carga async
};

export const number_test = '1150477033';

export const banks_valid = [
  'bancaribe',
  'bancamiga',
  'banesco',
  'venezuela',
  'banfanb',
  'bfc',
  'tesoro',
  'caroni',
  'mercantil',
];

export const banks = [
  {
    id:'banesco',
    name:'Banesco',
    number:'0134',
    word:null,
    trade:null,
    coordinates:null,
    type:null,
    example:'0115 04246663322 V 15555555 100000,00',
    path:'number 0phone doc_receptor_identifier doc_receptor amount,00',
    number_sms:'2846',
    condition:{
      path:null,
      sms:null,
    }
  },
  {
    id:'bancaribe',
    name:'Bancaribe',
    number:'0114',
    word:'mipago',
    trade:null,
    coordinates:null,
    type:null,
    example:'mipago V15555555 0175 100000,00 04246663322',
    path:'word doc_receptor_identifierdoc_receptor number amount,00 0phone',
    number_sms:'22741',
    condition:{
      path:null,
      sms:null,
    }
  },
  {
    id:'venezuela',
    name:'Banco de Venezuela',
    number:'0102',
    word:'PAGAR',
    type:null,
    trade:true,
    coordinates:null,
    example:'PAGAR 0134 04246663322 15555555 100000,00',
    path:'word number 0phone doc_receptor amount,00',
    number_sms:'2261',
    condition:{
      path:[
        {
          type:'replace',
          condition:'trade===true',
          action:'word,COMPRAR'
        }
      ]
      ,
      sms:[
        {
          type:'replace',
          condition:'trade===true',
          action:'number_sms,2662'
        }
      ],
    }
  },
  {
    id:'mercantil',
    name:'Banco Mercantil',
    number:'0105',
    word:'TPAGO',
    type:[
      {
        name:'Cuenta Ahorro 1', 
        value:'CA1',
      },
      {
        name:'Cuenta Ahorro 2', 
        value:'CA2',
      },
      {
        name:'Cuenta Corriente 1', 
        value:'CC1',
      },
      {
        name:'Cuenta Corriente 2', 
        value:'CC2',
      }
    ],
    trade:null,
    coordinates:null,
    password_temp:true,
    example:'TPAGO V6375354 CC1 0105 4243622260 V17607890 8500,00 67895433',
    path:'word doc_emisor_identifierdoc_emisor type number phone doc_receptor_identifierdoc_receptor amount,00 password_temp',
    number_sms:'24024',
    condition:{
      path:null,
      sms:null,
    }
  },
  {
    id:'banfanb',
    name:'BANFANB',
    number:'0177',
    word:'BANFP2P',
    type:null,
    trade:null,
    coordinates:null,
    example:'BANFP2P V15555555 4126663322 V15666666 171 10000000',
    path:'word doc_emisor_identifierdoc_emisor phone doc_receptor_identifierdoc_receptor number amount00',
    number_sms:'326200',
    condition:{
      path:null,
      sms:[
        {
          type:'replace',
          condition:'movilnet===true',
          action:'number_sms,78900'
        }
      ],
    }
  },
  {
    id:'bancamiga',
    name:'Bancamiga',
    number:'0172',
    word:'MPAGO',
    trade:null,
    coordinates:null,
    type:[
      {
        name:'Cuenta Ahorro', 
        value:'CA',
      },
      {
        name:'Cuenta Corriente', 
        value:'CC',
      }
    ],
    example:'MPAGO V15555555 CA 0114 04246663322 V15666666 100000',
    path:'word doc_emisor_identifierdoc_emisor type number 0phone doc_receptor_identifierdoc_receptor  amount',
    number_sms:'26448',
    condition:{
      path:null,
      sms:null,
    }
  },
  {
    id:'bfc',
    name:'Banco Fondo Común',
    number:'0151',
    word:'PAT',
    type:null,
    trade:null,
    coordinates:null,
    example:'PAT 0134 04246663322 100000,00 V15555555',
    path:'word number 0phone amount,00 doc_receptor_identifierdoc_receptor',
    number_sms:'88232',
    condition:{
      path:[
        {
          type:'replace',
          condition:'doc_receptor_identifier===J',
          action:'word,PAC'
        }
      ],
      sms:null,
    }
  },
  {
    id:'tesoro',
    name:'Banco del tesoro',
    number:'0163',
    word:'Pagar',
    type:null,
    trade:null,
    coordinates:true,
    example:'Pagar 0134 04266663322 V 15555555 100000,00 473',
    path:'word number 0phone doc_receptor_identifier doc_receptor amount,00 coordinates',
    number_sms:'2383',
    condition:{
      path:null,
      sms:null,
    }
  },
  {
    id:'caroni',
    name:'Banco Caroní',
    number:'0128',
    word:null,
    type:null,
    trade:null,
    coordinates:true,
    example:'0171 04246663322 V 15555555 100000,00 24',
    path:'number 0phone doc_receptor_identifier doc_receptor amount,00 coordinates',
    number_sms:'3266',
    condition:{
      path:null,
      sms:null,
    }
  },
  {
    id:'100_Banco',
    name:'100% Banco',
    number:'0156',
    word:'PAGO',
  },  
  {
    id:'provincial',
    name:'Banco Provincial',
    number:'0108',
    word:null,
  },
  {
    id:'banplus',
    name:'BANPLUS',
    number:'0174',
    word:null,
  },
  {
    id:'activo',
    name:'Banco Activo',
    number:'0171',
    word:null,
  },
  {
    id:'agricola',
    name:'Banco Agrícola',
    number:'0166',
    word:null,
  },
  {
    id:'exterior',
    name:'Banco Exterior',
    number:'0115',
    word:null,
  },
  {
    id:'exterior',
    name:'Banco Exterior',
    number:'0115',
    word:null,
  },
  {
    id:'bnc',
    name:'Banco Nacional de Crédito',
    number:'0191',
    word:null,
  },
  {
    id:'occidental',
    name:'Banco Occidental de Descuento',
    number:'0116',
    word:null,
  },
  {
    id:'plaza',
    name:'Banco Plaza',
    number:'0138',
    word:null,
  },
  {
    id:'bvcredito',
    name:'Banco Venezolano de Crédito',
    number:'0104',
    word:null,
  },
  {
    id:'sur',
    name:'Banco del Sur',
    number:'0157',
    word:null,
  },
  {
    id:'bancrecer',
    name:'Bancrecer',
    number:'0168',
    word:null,
  },
  {
    id:'mibanco',
    name:'Mi Banco',
    number:'0169',
    word:null,
  },
  {
    id:'sofitasa',
    name:'Sofitasa',
    number:'0137',
    word:null,
  },
  {
    id:'bicentenario',
    name:'Bicentenario',
    number:'0175',
    word:null,
  },
];