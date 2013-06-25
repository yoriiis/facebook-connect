"use strict";

var _FB = {

	init: function( appID, channelUrl ){
		
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

		FB.getLoginStatus(function( response ) {

			self.status = response.status;

			if( response.status === 'connected' ){
		        	self.getData( what, callback );
		        }else if( response.status === 'not_authorized' ){
		                self.login( what, scope, callback );
		        }else{
		                self.login( what, scope, callback );
		        }

		});

	},

	login: function( what, scope, callback ){

		var self = this;

		FB.login(function( response ) {

		        if( response.authResponse ) {
			        self.getData( what, callback );
		        }else{
		        	self.status = response.status;
		        }
	        
		}, {scope: scope});

	},

	getData: function( what, callback ){

		var self = this;

		FB.api(what, function( response ) {
			self.data = response;
			callback();
	    	});

	},

	loadSDK: (function(){

		var language = ( document.getElementById('__FB').getAttribute('data-language') != null ) ? document.getElementById('__FB').getAttribute('data-language') : 'fr_FR',
		    d = document, js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0], divFB = document.createElement('div');

	        if ( d.getElementById( id ) ) { return; }
	        js = d.createElement('script'); js.id = id; js.async = true;
	        divFB.id = 'fb-root';
	        js.src = '//connect.facebook.net/' + language + '/all.js';
	        d.getElementsByTagName('body')[0].appendChild( divFB ).appendChild( js );

	})(),

	ready: function( code ){

		window.fbAsyncInit = function() { code() };

	}

};

window._FB = _FB;
