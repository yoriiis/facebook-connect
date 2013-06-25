Facebook connect
==================================================

Easy way to use the Facebook API and the connect interface.

Call the Facebook plugins in your footer page. You can choose the language of SDK with data-language attribut (optionnal). Don't add DIV "fb-root" and the SDK because it's automaticcaly add.

```html
<script src="js/facebook.js" id="__FB"></script>
<script src="js/facebook.js" data-language="en_US" id="__FB"></script>
```

Insert your code in _FB.ready function.

```javascript
_FB.ready(function(){ });
```

Instanciate Facebook app with your application ID

```javascript
_FB.init('APP_ID');
```


Connect user, add permissions with token and get data.

- First parameter : what you want to get
- Second parameter : the scope with permission on private data which require a token

```javascript
_FB.getLoginStatus('/me', 'email,user_birthday', function(){ });
```

Access to JSON data

```javascript
_FB.data
```

###Documentation
- https://developers.facebook.com/docs/reference/api/
- https://developers.facebook.com/tools/explorer/
