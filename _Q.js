/*
---

script: _q.js
description: The core 
license: MIT-style license.
version 0.6
lastupdated: Nov, 6th 2012
author: Brandon Corbin http://github.com/brandoncorbin/_Q

  
...
*/
var _Q = {
	me: this,
/************************************************************************ 
	Cookie
	************************************************************************/
	cookie: {
		set: function(name, value, days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			} else {
				var expires = "";
			}
			document.cookie = name + "=" + value + expires + "; path=/";
		},
		// Get Cookie
		get: function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1, c.length);
				}
				if (c.indexOf(nameEQ) == 0) {
					return c.substring(nameEQ.length, c.length);
				}
			}
			return null;
		},
		// end get
		// Erase a Cookie
		erase: function(name) {
			_Q.cookie.set(name, "", -1);
		},
		delete: function(name) {
			_Q.cookie.erase(name);
		},
		// Check if a cookie exists
		exists: function(name) {
			if (_Q.cookie.get(name) != null) {
				return true;
			} else {
				return false;
			}
		} // end exists
	},
	// end Cookie
	url: {
		get: function() {
			return document.location;
		},
		// end get 
		// Get URL Params as Array
		params: function() {
			var variables = [],
				hash;
			var collection = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for (var i = 0; i < collection.length; i++) {
				hash = collection[i].split('='); // Create array from the = sign
				variables.push(hash[0]); // Push the array up
				variables[hash[0]] = hash[1]; // Set the variables array with the results
			}
			return variables;
		},
		// Get a Specific Param
		param: function(id) {
			var params = this.params();
			if (params[id] == null) {
				return '';
			} else {
				return params[id];
			}
		},
		domain: function() {
			return document.domain;
		}
	},
	// End URL
	visitor: {
		user_agent: function() {
			return navigator.userAgent;
		},
		// Get Current Browser 
		browser: function() {
			agent = this.user_agent();
			if (agent.match(/chrome/gi)) {
				return "Chrome";
			} else if (agent.match(/safari/gi)) {
				return "Safari";
			} else if (agent.match(/MSIE 6/gi)) {
				return "IE6";
			} else if (agent.match(/MSIE 7/gi)) {
				return "IE7";
			} else if (agent.match(/MSIE 8/gi)) {
				return "IE8";
			} else if (agent.match(/firefox/gi)) {
				return "Firefox";
			} else {
				return "Unknown";
			}
		},
		// Get Visitor OS
		os: function() {
			return navigator.platform;
		},
		// Get a unique ID for this visitor. (last a year)
		uid: function() {
			if (_Q.cookie.exists('_qvid')) {
				return _Q.cookie.get('_qvid');
			} else {
				var qvid = _Q.string.createUUID();
				_Q.cookie.set('_qvid', qvid, 300);
				return qvid;
			}
		} // End UID
	},
	// End Visitor
	string: {
		// Encode String using Base64
		encode: function(str) {
			return _Q.base64.encode(str);
		},
		// Decode String using Base64
		decode: function(encodedstr) {
			return _Q.base64.decode(encodedstr);
		},
		// Text Contains
		contains: function(needle, haystack, case_sensitive) {
			if (!case_sensitive) {
				needle = needle.toLowerCase();
				haystack = haystack.toLowerCase();
			}
			if (haystack.match(needle)) {
				return true;
			} else {
				return false;
			}
		},
		// Computerize String
		urlformat: function(str) {
			str = str.replace(/[^a-zA-Z 0-9]+( )/g, '');
			str = str.replace(/( )/g, "-");
			str = str.toLowerCase();
			return str;
		},
		// Trim White Space
		trim: function(string) {
			return string.replace(/^\s+|\s+$/g, "");
		},
		// Left Trim White Space
		ltrim: function(string) {
			return string.replace(/^\s+/, "");
		},
		// Right Trim White Space (say that 10 times fast)
		rtrim: function(string) {
			return string.replace(/\s+$/, "");
		},
		random: function(length) {
	 		return  this.createUUID(length);
 		},
		createUUID: function(length) {
			if(length==null) {
				length=32;
			}
			var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			var result = '';
		    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
		    return result;
		} // End Create UUID	
	},
	text: {},
	// End Text
	number: {
		// format number to 1,324,499
		comma: function(nStr) {
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		},
		dollar: function(num) {
			num = num.toString().replace(/\$|\,/g, '');
			if (isNaN(num)) num = "0";
			sign = (num == (num = Math.abs(num)));
			num = Math.floor(num * 100 + 0.50000000001);
			cents = num % 100;
			num = Math.floor(num / 100).toString();
			if (cents < 10) cents = "0" + cents;
			for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
			num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
			return (((sign) ? '' : '-') + '$' + num + '.' + cents);
		}
	},
	// End Number
	validate: {
		email: function(email) {
			return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
		},
		postal: function(postal) {
			return /(^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)/.test(postal);
		},
		phone: function(phone) {
			phone = phone.replace(/(\-| |\(|\))/gi, "");
			return /^(1\s*[-\/\.]?)?(\((\d{3})\)|(\d{3}))\s*[-\/\.]?\s*(\d{3})\s*[-\/\.]?\s*(\d{4})\s*(([xX]|[eE][xX][tT])\.?\s*(\d+))*$/.test(phone);
		},
		// Validate if this is a human or not by displaying a confirm message
		human: function(message) {
			if (message == null) {
				message = "Sorry to bother you, but I need to know if you are a human. Simply click ok to continue";
			}
			return confirm(message);
		},
	},
	// End Validate
	script: {},
	// End Script,
	base64: {
		_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		encode: function(input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			input = _Q.base64._utf8_encode(input);
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64
				} else if (isNaN(chr3)) {
					enc4 = 64
				}
				output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4)
			}
			return output
		},
		decode: function(input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			while (i < input.length) {
				enc1 = this._keyStr.indexOf(input.charAt(i++));
				enc2 = this._keyStr.indexOf(input.charAt(i++));
				enc3 = this._keyStr.indexOf(input.charAt(i++));
				enc4 = this._keyStr.indexOf(input.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2)
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3)
				}
			}
			output = _Q.base64._utf8_decode(output);
			return output
		},
		_utf8_encode: function(string) {
			string = string.replace(/\r\n/g, "\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c)
				} else if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128)
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128)
				}
			}
			return utftext
		},
		_utf8_decode: function(utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
			while (i < utftext.length) {
				c = utftext.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++
				} else if ((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i + 1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2
				} else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3
				}
			}
			return string
		}
	},
	// end Base 64
	storage: {
		data: new Object(),
		loaded: false,
		set: function(key, value) {
			this.load();
			this.data[key] = value;
			var stringversion = JSON.stringify(this.data);
			var encodedversion = _Q.string.encode(stringversion);
			_Q.cookie.set('_qdb', encodedversion, 365);
		},
		// Get Value from Storage by Key
		get: function(key) {
			this.load();
			if (this.data[key]) {
				return this.data[key];
			} else {
				return null;
			}
		},
		// Remove a Storage Element
		remove: function(key) {
			this.load();
			delete this.data[key];
			_Q.cookie.set('_qdb', _Q.string.encode(serialize(this.data)));
		},
		// Load up the Storage Array
		load: function() {
			var storage = _Q.cookie.get('_qdb');
			if (storage) {
				data = eval('(' + _Q.string.decode(_Q.cookie.get('_qdb')) + ')');
			} else {
				_Q.cookie.set('_qdb', _Q.string.encode(JSON.stringify(this.data)));
			};
			this.loaded = true;
		}
	},
};