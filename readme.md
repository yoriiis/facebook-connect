Facebook connect
==================================================

Easy way to use the Facebook API and the connect interface.

Add only this Facebook script in your footer page. Don't add "fb-root" tag and the SDK, all it's automatically add for you. On Facebook ready, a CSS class is add in html tag (fb-ready)

Quickstart
--------------------------------------

```javascript
_facebook.init({
    appID: 'XXXXXXXXXXXXXXX',
    locale: 'fr_FR',
    async: true,
    target: '/me',
    authorization: 'email',
    xfbml: true,
    status: true,
    version: 'v2.0',
    debug: false
}, callback);
```

###SDK
You can choose the language of the SDK (default is fr_FR), and the version (default is last 2.1). Option debug allow you to activate the debug mode of the Facebook SDK. By default the SDK is load in asynchronous mode.

```javascript
locale : 'fr_FR',
version: 'v2.0',
debug: false,
async: true
```

###Login
The script use the Facebook login functionnality, with a few parameters that you makes this easy ! Target "me" matching to your Facebook account, and authorization is what do you want to recover (separate by comma). The status option at true use the SDK to get info about the current user immediately after init.

```javascript
target: '/me',
authorization: 'email',
status: true
```

###XFBML
With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added.

```javascript
xfbml: true
```

###Callback
The callback function is use to write your code, and it will be execute on Facebook ready (equivalent to window.fbAsyncInit function).

Invoking the Login
--------------------------------------

On Facebook ready callback, you can start the connection.

```javascript
_facebook.connect();
```
  
Events
--------------------------------------

On facebook ready callback, you can attach to two events that share parameters, "datas" contains all data from the user account, and "status", the status of the connection.

```javascript
_facebook.on('connected', function(e, datas, status) {
    console.log(datas, status);
});

_facebook.on('not_authorized', function(e, status) {
    console.log("error::", status);
});
```

Facebook give you access to other datas
```javascript
FB.getAccessToken()
FB.getUserID()
FB.getAuthResponse()
```

###Documentation
- https://developers.facebook.com/docs/reference/api/
- https://developers.facebook.com/tools/explorer/
