Facebook connect
==================================================

Easy way to use the Facebook API and the connect interface.

Add only the Facebook plugins in your footer page. You can choose the language of SDK with data-language attribut (optionnal), by default french. Don't add "fb-root" tag and the SDK, it's automatically add. On Facebook ready, a CSS class is add in html tag (fb-ready)

```html
<script src="js/facebook.js" id="__FB"></script>
<script src="js/facebook.js" data-language="en_US" id="__FB"></script>
```

Insert your code in _FB.ready function (single instance, equivalent to window.fbAsyncInit function).

```javascript
_FB.ready(function(){ });
```

###Instanciate Facebook app.
This function instanciate your application and get automatically data if user is already connected and authorized.

- First parameter 		: Facebook application ID
- Second parameter 		: What you want to get
- Third parameter 		: The scope with permission on private data which require a token (separate by comma)

```javascript
_FB.init('XXXXXXXXXXXXXXX', '/me', 'email,user_birthday');
```

###Connection
Connect the user with his Facebook account. If user isn't connected or authorized, popup authentification will open.

```javascript
_FB.connect();
```

###Attach event
On success, attach to "connected" event width jQuery. Then you can access to data and execute your code.

```javascript
_FB.on('connected', function(){
  console.log( this.data );
});
```


Access to JSON data with _FB object available in window

```javascript
_FB.data

//Other data
FB.getAccessToken()
FB.getUserID()
FB.getAuthResponse()
```

###Documentation
- https://developers.facebook.com/docs/reference/api/
- https://developers.facebook.com/tools/explorer/
