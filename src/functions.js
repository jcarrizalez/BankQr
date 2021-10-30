import {encrypt, decrypt} from './lib/crypto-js';
import {storage} from './store';

export const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
	.replace(/[xy]/g, function(c) {
    	var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    	return v.toString(16);
  	});

export const formated = value => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const parse = value => JSON.parse(value);
export const stringify = value => JSON.stringify(value);
export const object = value => parse(stringify(value));
export const number = str => ('0123456789'.indexOf(str) !== -1) ;

export const objectDecode = (string, link=null) => {
	var data;
	if(link===null){
		link = storage.link;
	}
	try {
	    data = decodeURI(string);
	    data = data.replace(link,'');
	    data = parse(decrypt(data));
	}
	catch (error) {
		data = '';  
	}
	data = data.split('|');

	if(!data[5]) return null;

	var obj = {
  		bank:data[0],
  		number:data[1],
  		phone:data[2],
  		identifier:data[3],
  		document:data[4],
  		headline:data[5],
	};

	if(data[6]) {
		obj.amount = data[6];
	}
	return obj;
};


export const evalAmount = (value, item) => {
  item = ''+item.replace('.','');
  value = value.replace('.','');
  if(value==='0'){
    value = item; 
  } 
  else if(value.length>9){
    value = value; 
  } 
  else value += item; 
  
  if(item==='C' || (value==='000' && item==='000')){
    value = '0';
  }
  return value;
}

export const isLine = number => {
  number = number.split('');
  let value = null;
  if(number[3]){
    number = number[0]+number[1]+number[2]+number[3];
    if(['0412'].includes(number)){
      value = 'digitel';
    }
    else if(['0416', '0426'].includes(number)){
      value = 'movilnet';
    }
    else if(['0414', '0424'].includes(number)){
      value = 'movistar';
    }
    return value;
  }
}

export const stringFormat = obj => {
  var string = obj.bank_id+'|'+obj.trade+'|'+obj.type+'|'+obj.phone+'|'+obj.doc_emisor_identifier+'|'+obj.doc_emisor+'|'+obj.headline;
  if(obj.amount){
    string = string+'|'+obj.amount;
  }
  return string;
}

