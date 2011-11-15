/*
---
 
script: _q.js
description: The core 
license: MIT-style license.
version 0.5
author: Brandon Corbin http://icorbin.com http://underscoreq.com

  
...
*/

// Define the base Q object
var _Q = new _qobj();
function _qobj() { 
	this.cookie = new _qcookie();
	this.url = new _qurl();
	this.visitor = new _qvisitor();
	this.script = new _qscript();
	this.text = new _qstring();
	this.validate = new _qvalidator();
	this.number = new _qnumber();
};


/***********************
**** Working with Cookies
// Cookie Manipulation
// based on http://www.quirksmode.org/js/cookies.html
*************************/

function _qcookie() {
	this.set = function(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		} else {
			var expires = "";
		}
		document.cookie = name+"="+value+expires+"; path=/";
	};
	// Get Cookie
	this.get = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') {  c = c.substring(1,c.length); }
			if (c.indexOf(nameEQ) == 0) {  return c.substring(nameEQ.length,c.length); }
		}
		return null;
	}; // end get
	// Erase a Cookie
	this.erase = function(name) {
		this.set(name,"",-1);
	};
	// Check if a cookie exists
	this.exists = function(name) {
		if(this.get(name)!=null) {
			return true;	
		} else {
			return false;
		}	
	}; // end exists

};

/***********************
**** Wrking with URLS
*************************/

function _qurl() {
	this.get = function() { 
		 return document.location; 
	}; // end get 
	
	// Get URL Params as Array
	this.params = function() {
		var variables = [], hash;
		var collection = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < collection.length; i++) {
			hash = collection[i].split('='); // Create array from the = sign
			variables.push(hash[0]); // Push the array up
			variables[hash[0]] = hash[1]; // Set the variables array with the results
		}
		return variables;
	};
	
	// Get a Specific Param
	this.param = function(id) { 
		var params = this.params();
		if(params[id]==null) { return ''; } else { return params[id]; }
	};
	
	
	this.domain = function() {
		return document.domain;	
	};
	


}; // end _qurl;



/***********************
**** Visitor Functions
*************************/

function _qvisitor() { 
	
	this.cookie = new _qcookie();
	this.storage = new _qstorage();

	this.user_agent = function() {
		return navigator.userAgent;	
	};
	// Get Current Browser 
	this.browser = function() {
		agent = this.user_agent();
		if(agent.match(/chrome/gi))  { return "Chrome"; } 
		else if(agent.match(/safari/gi))  { return "Safari"; } 
		else if(agent.match(/MSIE 6/gi)) { return "IE6"; }
		else if(agent.match(/MSIE 7/gi)) { return "IE7"; }
		else if(agent.match(/MSIE 8/gi)) { return "IE8"; }
		else if(agent.match(/firefox/gi)) {  return "Firefox"; }
		else { return "Unknown"; } 
		
	};
	
	// Get Visitor OS
	this.os = function() {
		return navigator.platform;	
	};
	
	// Get a unique ID for this visitor. (last a year)
	this.uid = function() {
		var cookie = new _qcookie();
		var text = new _qstring();
		if(cookie.exists('_qvid')) {
			return cookie.get('_qvid');	
		} else {
			var qvid = text.createUUID();
			cookie.set('_qvid',qvid,300);
			return qvid;
		}
		
	}; // End UID

}; // END visitor

/***********************
**** Q.text (yea i know its string, i wasnt thinking). 
**** Working with Text.
*************************/

function _qstring() {
	// Encode String using Base64
	this.encode = function(str) { 
		return _qBase64.encode(str);
	};
	// Decode String using Base64
	this.decode = function(encodedstr) {
		return _qBase64.decode(encodedstr);	
	};
	// Text Contains
	this.contains = function(needle,haystack,case_sensitive) {
		if(!case_sensitive) {
			needle = needle.toLowerCase();
			haystack = haystack.toLowerCase();
		}
		if(haystack.match(needle)) { return true; } else { return false; }
	};
	
	// Computerize String
	this.urlformat = function(str) {
		str = str.replace(/[^a-zA-Z 0-9]+( )/g,'');
		str = str.replace(/( )/g,"-");
		str = str.toLowerCase();
		return str;
	};
	
	// Trim White Space
	this.trim = function(string) {
		return string.replace(/^\s+|\s+$/g,"");
	};
	
	// Left Trim White Space
	this.ltrim = function(string) {
		return string.replace(/^\s+/,"");
	};
	
	// Right Trim White Space (say that 10 times fast)
	this.rtrim = function(string) {
		return string.replace(/\s+$/,"");
	};
	
	
	/* randomUUID.js - Version 1.0
	* Copyright 2008, Robert Kieffer
	* This software is made available under the terms of the Open Software License
	* v3.0 (available here: http://www.opensource.org/licenses/osl-3.0.php )
	* The latest version of this file can be found at:
	* http://www.broofa.com/Tools/randomUUID.js
	* For more information, or to comment on this, please go to:
	* http://www.broofa.com/blog/?p=151
	*/

	this.createUUID = function() {
		var s = [], itoh = '0123456789ABCDEF';
		// Make array of random hex digits. The UUID only has 32 digits in it, but we
		// allocate an extra items to make room for the '-'s we'll be inserting.
		for (var i = 0; i <36; i++) s[i] = Math.floor(Math.random()*0x10);
			// Conform to RFC-4122, section 4.4
			s[14] = 4;  // Set 4 high bits of time_high field to version
			s[19] = (s[19] & 0x3) | 0x8;  // Specify 2 high bits of clock sequence
			// Convert to hex chars
			for (var i = 0; i <36; i++) s[i] = itoh[s[i]];
			// Insert '-'s
			s[8] = s[13] = s[18] = s[23] = '-';
			return s.join('');
	}; // End Create UUID
	
};




function _qscript() {
	
	// Dynamically Load a Script
	this.load = function(scripturl, callback) {
	
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src=scripturl;
		
		// most browsers
		script.onload = callback;
		// IE 6 & 7
		script.onreadystatechange = function() {
			if (this.readyState == 'complete') {
				callback();
			};
		};
	
		document.getElementsByTagName('HEAD').item(0).appendChild(script); 
		
	}; // End script.load;
	
	this.remove = function(url) {
		var filetype='js'
		var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none"; //determine element type to create nodelist from
		var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none"; //determine corresponding attribute to test for
		var allsuspects=document.getElementsByTagName(targetelement);
		for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
		  if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1) {
		   	allsuspects[i].parentNode.removeChild(allsuspects[i]); //remove element by calling parentNode.removeChild()
		  };
		};

	};
	
	this.load_jQuery = function(callback) {
		if(!callback)  callback = null;	
		this.load('http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js',callback);
	}; // end load jquery  
	
	this.load_jQueryUI = function(callback) {
		if(!callback)  callback = null;	
		this.load('http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js',callback);
	}; // end load jquery UI 
	
	this.load_prototype = function(callback) {
		if(!callback)  callback = null;	
		this.load('http://ajax.googleapis.com/ajax/libs/prototype/1.6.1.0/prototype.js',callback);
	}; // end load prototype
	
	this.load_mootools = function(callback) {
		if(!callback)  callback = null;	
		this.load('http://ajax.googleapis.com/ajax/libs/mootools/1.2.4/mootools-yui-compressed.js',callback);
	}; // end load mootools
	
	this.load_scriptaculous = function(callback) {
		if(!callback)  callback = null;	
		this.load('http://ajax.googleapis.com/ajax/libs/scriptaculous/1.8.3/scriptaculous.js',callback);
	}; // end load scriptaculous
	
	
	
	
}; // _qscript();


/***********************
**** Validator Functions 
*************************/

function _qvalidator() {
	
	this.email = function(email) {
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
	};
	
	this.postal = function(postal) { 
		return /(^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)/.test(postal);
	};
	
	this.phone = function(phone) {
		phone = phone.replace(/(\-| |\(|\))/gi,"");
		return /^(1\s*[-\/\.]?)?(\((\d{3})\)|(\d{3}))\s*[-\/\.]?\s*(\d{3})\s*[-\/\.]?\s*(\d{4})\s*(([xX]|[eE][xX][tT])\.?\s*(\d+))*$/.test(phone);
	};
	
	// Validate if this is a human or not by displaying a confirm message
	this.human = function() {
		return confirm("Sorry to bother you, but I need to know if you are a human. Simply click ok to continue");
	};
	
}; // End Validator


/***********************
**** Number Functions
*************************/

function _qnumber() {
	
	// format number to 1,324,499
	this.comma = function(nStr) { 
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;

	};
	
	this.dollar = function(num) { 
		num = num.toString().replace(/\$|\,/g,'');
		if(isNaN(num))
		num = "0";
		sign = (num == (num = Math.abs(num)));
		num = Math.floor(num*100+0.50000000001);
		cents = num%100;
		num = Math.floor(num/100).toString();
		if(cents<10)
		cents = "0" + cents;
		for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
		num = num.substring(0,num.length-(4*i+3))+','+
		num.substring(num.length-(4*i+3));
		return (((sign)?'':'-') + '$' + num + '.' + cents);
	};
	
};

/***********************
**** CLIENT STORAGE 
*************************/

function _qstorage() {
	
	var data = new Object();
	data['storage'] = "on";
	var cookie = new _qcookie();
	var loaded = false;
	var text = new _qstring();
	
	this.set = function(key, value) { 
		this.load();
		data[key]=value;
		var stringversion = JSON.encode(data);
		var encodedversion = text.encode(stringversion);
		cookie.set('_qdb',encodedversion,365);
		
	};

	// Get Value from Storage by Key
	this.get = function(key) { 
		this.load();
		if(data[key]) {
			return data[key];
		} else {
			return null;	
		}
	};
	
	// Remove a Storage Element
	this.remove = function(key) {
		this.load();
		delete data[key];
		cookie.set('_qdb',text.encode(serialize(data)));
	};
	// Load up the Storage Array
	this.load = function() {
		
		var storage = cookie.get('_qdb');
		if(storage) {
			data = eval('(' + text.decode(cookie.get('_qdb')) + ')');
		} else {
			cookie.set('_qdb',text.encode(JSON.encode(data)));	
		};
		
		this.loaded = true;
		
	};

	
}; // end Storage




/* Light weight JSON encoded by http://vision-media.ca/resources/javascript/lightweight-javascript-json-encoding */

JSON={encode:function(input){if(!input){return'null'}switch(input.constructor){case String:return'"'+input+'"';break;case Number:return input.toString();break;case Array:var buf=[];for(i in input){buf.push(JSON.encode(input[i]))}return'['+buf.join(', ')+']';break;case Object:var buf=[];for(k in input){buf.push(k+' : '+JSON.encode(input[k]))}return'{ '+buf.join(', ')+'} ';break;default:return'null';break}}};

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/


// Creation of Base 64 Object
var _qBase64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=_qBase64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4)}return output},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2)}if(enc4!=64){output=output+String.fromCharCode(chr3)}}output=_qBase64._utf8_decode(output);return output},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128)}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128)}}return utftext},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++}else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3}}return string}};