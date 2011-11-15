Cookies
Mmmm.. Cookies. Getting, Setting, Erasing and Checking. Example: Click see how many times you have been to this page.

_Q.cookie.set(name, value, expires_in_days)
Sets a cookie

_Q.cookie.get(name)
Gets a cookie by name

_Q.cookie.erase(name)
Deletes a cookie by name

_Q.cookie.exists(name)
Returns true or false if a cookie exists or not

Visitor

Website Visitor details with Javascript - including Browsers, OS, Unique ID and Client Side storage (even with IE)

_Q.visitor.browser()
Returns the name of the Browser - Firefox, Chrome, Safari, IE6, IE7, IE8 Try it

_Q.visitor.os()
Returns the name of the visitors OS Try it

_Q.visitor.uid()
Returns an a unique ID for the current visitor Try it
Visitor.Storage
A simple yet powerful method for storing client side encoded (base64) data. Each item is presented as its own cookie, so a limit of 200 items and no more than 4k per item.
_Q.visitor.storage.set(key,value)
Saves the key and value as an encoded cookie

_Q.visitor.storage.get(key)
Returns the value of the visitors datastore for the given key, will return null if its not set

_Q.visitor.storage.remove(key)
Removes a value from the visitors storage

_Q.visitor.storage.show()
Shows a table containing the current visitos data Try it

Validate

Super straight forward methods for validating email, phone, zipcodes and if someone is human

_Q.validate.email(email_address)
Returns the true if its a valid email address, false if not
Email Validate

_Q.validate.phone(phonenumber)
Returns the true if its a valid phone number, false if not
Phone Number  Validate

_Q.validate.zipcode(zip_code)
Returns the true if its a valid US zip code, false if not
Postal Code  Validate

_Q.validate.human()
Returns the true if its a the user is Human, using a confirmation alert
Validate your Humanness

URL
Using javascript to read URL variables

_Q.url.get()
Returns the full URL for the current site

_Q.url.param(name)
Gets a URL variable (param) by the name, if it doesn't exist it will return an empty string

_Q.url.params()
Returns an Array of the current URL parameters

_Q.url.base()
Returns an string containing the base URL

TEXT
Encoding and decoding Text using base64, Simple searching, unique IDs, URL formated text and trimming

_Q.text.encode(str)
Returns a BASE64 encoded version of the string

_Q.text.decode(encoded_str)
Returns a decoded Base64 String

_Q.text.contains(needle, haystack, is_case_sensitive)
Returns an True of False if text Contains the needle

_Q.text.createUUID()
Returns a 32 character long Unique ID - Try it

_Q.text.urlformat(string)
Take a string like "This Is a Good Day" and returns "this-is-a-good-day"

_Q.text.trim(string)
Removes white space from a string and returns it

_Q.text.ltrim(string)
Removes white space from the left side of a string and returns it

_Q.text.rtrim(string)
Removes white space from the right side of a string and returns it

Script
Dynamically load the Javascript library of choice

_Q.script.load(script_url, callback_function)
Dynamically loads a Javascript file, then does the call back function once its loaded

_Q.script.remove(script_url)
Dynamically Removes a Javascript file

_Q.script.load_jQuery(callback_function)
Dynamically loads the jQuery Framework, then does the call back function once its being loaded

_Q.script.load_jQueryUI(callback_function)
Dynamically loads the jQueryUI Framework, then does the call back function once its being loaded

_Q.script.load_prototype(callback_function)
Dynamically loads the Prototype Framework, then does the call back function once its being loaded

_Q.script.load_scriptaculous(callback_function)
Dynamically loads the Scriptaculous Framework, then does the call back function once its being loaded

_Q.script.load_mootools(callback_function)
Dynamically loads the MooTools Framework, then does the call back function once its being loaded

Number
Working with dollar formats

_Q.number.comma(num)
Returns the a number with the 1000 comma.

_Q.number.dollar(num)
Returns a dollar formated version of a number

Functions
Working with existing functions - specifically knowing when a function is called, and taking an action

_Q.func.inject("FunctionName", callback)
When FunctionName is triggered - the callback argument will be called first.