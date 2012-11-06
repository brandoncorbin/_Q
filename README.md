_Q (_Quick) Simply Javascript Tools
====================

Cookies
--------
Mmmm.. Cookies. Getting, Setting, Erasing and Checking. Example: Click see how many times you have been to this page.


**Sets a cookie**

```javascript
_Q.cookie.set(name, value, expires_in_days)
```

**Gets a cookie by name**

```javascript
_Q.cookie.get(name)
```

**Deletes a cookie by name**

```javascript
_Q.cookie.erase(name)
```

**See if a cookie exists**

```javascript
_Q.cookie.exists(name)
```

Returns true or false if a cookie exists or not

Visitor
-------

Website Visitor details with Javascript - including Browsers, OS, Unique ID and Client Side storage (even with IE)

**What browser**

```javascript
_Q.visitor.browser()
```

Returns the name of the Browser - Firefox, Chrome, Safari, IE6, IE7, IE8 Try it

**What OS**

```javascript
_Q.visitor.os()
```

Returns the name of the visitors OS Try it

**Get UID for current User**

```javascript
_Q.visitor.uid()
```

Returns an a unique ID for the current visitor 

Visitor.Storage
-----------

A simple yet powerful method for storing client side encoded (base64) data. Each item is presented as its own cookie, so a limit of 200 items and no more than 4k per item.

**Save a key + value**

```javascript
_Q.visitor.storage.set(key,value)
```

**Get a value from a key**

```javascript
_Q.visitor.storage.get(key)
```

**Remove Storage**

_Q.visitor.storage.remove(key)
Removes a value from the visitors storage


_Q.URL
-----

Using javascript to read URL variables

**Get current URL**

```javascript
_Q.url.get()
```

Returns the full URL for the current site


**Get URL Parameter**

```javascript
_Q.url.param(name)
```

Gets a URL variable (param) by the name, if it doesn't exist it will return an empty string. Example: what.html?name=Tonka  _Q.url.param('name') would equal Tonka

**Get ALL Url params as an array**

```javascript
_Q.url.params()
```

Returns an Array of the current URL parameters

**Get Base URL**

```javascript
_Q.url.base()
```

Returns an string containing the base URL

String
-------

Encoding and decoding Text using base64, Simple searching, unique IDs, URL formated text and trimming

**Base64 Encode a string**

```javascript
_Q.string.encode(str)
```
Returns a BASE64 encoded version of the string

**Base64 Decode a String**

```javascript
_Q.string.decode(encoded_str)
```

Returns a decoded Base64 String

**Quick Text Find**

```javascript
_Q.string.contains(needle, haystack, is_case_sensitive)
```

Returns an True of False if text Contains the needle

**Generate Unique String**

```javascript
_Q.string.random(6)
```

Generates alpha-numeric case sensitive unique string

**Create a URL friendly version of a string**

```javascript
_Q.string.urlformat(string)
```

Take a string like "This Is a Good Day" and returns "this-is-a-good-day"

**Trim whitespace from the beginning and end of a string**

```javascript
_Q.string.trim(string)
```

Removes white space from a string and returns it

**Trim whitespace from the left side of a string**

```javascript
_Q.string.ltrim(string)
```

**Trim whitespace from the right side of a string**

```javascript
_Q.string.rtrim(string)
```


_Q.number
--------

**Add Commas to 1,000**

```javascript
_Q.number.comma(num)
```

Returns the a number with the 1000 comma.

**Convert number to dollar format**

```javascript
_Q.number.dollar(num)
```


