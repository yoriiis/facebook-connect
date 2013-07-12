/**
 *
 * Plugin: 
 * @version 1.1
 *
 * @author: Joris DANIEL
 * @fileoverview: Easy way to use the Facebook API 
 * Same support that Facebook API
 *
 * Copyright (c) 2013 Joris DANIEL
 * Licensed under the MIT license
 *
**/

"use strict";

var _FB = {

	init: function( appID, what, scope, callback ){
		
		var self 				= this,
		timerAutoGetData 			= 500;
		this.what 				= what;
		this.scope 				= scope;
		this.callback 				= callback;

		//Instanciate the Facebook apps with appID and channel url (optionnal)
		FB.init({
			appId 				: appID,
			status 				: true,
			cookie 				: true,
			xfbml 				: true
		});

		//Prevent Facebook API not ready
		setTimeout(function(){

			//If user already granted, auto get data
			if( FB.getAuthResponse() ){
				self.getData( what );
			}

		}, timerAutoGetData);

	},

	connect: function(){

		var self = this;

		//Check status of Facebook connection
		FB.getLoginStatus(function( response ) {

			//Status of the connection
			self.status = response.status;

			if( response.status === 'connected' ){
				self.getData();
			}else if( response.status === 'not_authorized' ){
				self.login();
			}else{
				self.login();
			}

		});

	},

	login: function(){

		var self = this;

		//Facebook login function
		FB.login(function( response ) {

	        if( response.authResponse ) {
			self.getData();
	        }else{
			self.status = response.status;
	        }
	        
	    }, { scope: self.scope });

	},

	getData: function(){

		var self = this;

		//Call Open Grap API and save data
		FB.api(self.what, function( response ) {
			self.data = response;
			self.callback();
		});

	},

	ready: function( app ){

		//On Facebook ready
		window.fbAsyncInit = function() {

			//Parse the DOM to instanciate Facebook plugins (Like)
			FB.XFBML.parse();

			//AddClass in html tag when Facebook is ready 
			document.getElementsByTagName("html")[0].className += ' fb-ready';

			//Your code
			app();
			
		};

	},

	loadSDK: (function(){

		//Get the language in data attribut if available, else default language
		var defaultLanguage = 'fr_FR',
		    language = ( document.getElementById('__FB').getAttribute('data-language') != null && document.getElementById('__FB').getAttribute('data-language') != '' ) ? document.getElementById('__FB').getAttribute('data-language') : defaultLanguage;

		//Load the Facebook SDK JS and add the tag "fb-root"
		(function(d, s, id){

			var js, tag = document.createElement('div');
			if (d.getElementById(id)) {return;}
			tag.id = 'fb-root';
			js = d.createElement(s); js.id = id; js.async = false;
			js.src = "//connect.facebook.net/" + language + "/all.js";
			d.getElementsByTagName('body')[0].appendChild( tag );
			d.getElementsByTagName('body')[0].appendChild( js );

		}(document, 'script', 'facebook-jssdk'));

	})()

};

//Push _FB in window
window._FB = _FB;
