/**
 *
 * Plugin: 
 * @version 1.0
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

	init: function( appID, channelUrl ){
		
		//Instanciate the Facebook apps with appID and channel url (optionnal)
		FB.init({
			appId: appID,
			channelUrl: ( typeof channelUrl != 'undefined' ) ? channelUrl : '',
			status: true,
			cookie: true,
			xfbml: true
		});

	},

	getLoginStatus: function( what, scope, callback ){

		var self = this;

		//Check status of Facebook connection
		FB.getLoginStatus(function( response ) {

			//Status of the connection
			self.status = response.status;

			if( response.status === 'connected' ){

				//User is connected, get data
                self.getData( what, callback );

            }else if( response.status === 'not_authorized' ){

            	//User is not authorized
                self.login( what, scope, callback );

            }else{

            	//Other case
                self.login( what, scope, callback );

            }

		});

	},

	login: function( what, scope, callback ){

		var self = this;

		//Facebook login function
		FB.login(function( response ) {

	        if( response.authResponse ) {

	        	//Save accessToken and signedRequest
	        	self.accessToken = response.authResponse.accessToken;
				self.signedRequest = response.authResponse.signedRequest;

	            self.getData( what, callback );

	        }else{
	        	self.status = response.status;
	        }
	        
	    }, {scope: scope});

	},

	getData: function( what, callback ){

		var self = this;

		//Call Open Grap API and save data
		FB.api(what, function( response ) {

			self.data = response;
			callback();

	    });

	},

	ready: function( code ){

		//On Facebook ready
		window.fbAsyncInit = function() {

			//Parse the DOM to instanciate Facebook plugins (Like)
			FB.XFBML.parse();

			//AddClass in html tag when Facebook is ready 
			document.getElementsByTagName("html")[0].className += ' fb-ready';

			//Your code
			code();
			
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
