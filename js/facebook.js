/**
 *
 * Plugin:
 * @version 1.2
 *
 * @author: Joris DANIEL
 * @fileoverview: Easy way to use the Facebook API
 * Same support that Facebook API
 *
 * Copyright (c) 2013 Joris DANIEL
 * Licensed under the MIT license
 *
**/

(function ($, window) {

    "use strict";

    var _FB = {};

    _FB = {

        init: function( appID, what, scope ){

            var self                = this,
            timerAutoGetData        = 500;
            this.what               = what;
            this.authorization      = scope;
            this.doc                = $(document);
            this.handlers           = {};

            //Instanciate the Facebook apps with appID
            FB.init({
                appId               : appID,
                status              : true,
                cookie              : true,
                xfbml               : true
            });

            //Prevent Facebook API not ready
            setTimeout(function(){

                //If user already granted, auto get data
                if( FB.getAuthResponse() ){
                    self.status = 'connected';
                    self.getData();
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

                self.status = response.status;

                if( response.authResponse ) {
                    self.getData();
                }else{

                    if( response.status === 'not_authorized' ){
                        self.trigger('not_authorized');
                    }

                }

            }, { scope: self.authorization });

        },

        getData: function(){

            var self = this;

            //Call Open Grap API
            FB.api(self.what, function( response ) {

                //Save user data and status
                self.data = response;

                //Trigger success event
                self.trigger('connected');

            });

        },

        ready: function( locale, app ){

            //On Facebook ready
            window.fbAsyncInit = function() {

                //Parse the DOM to instanciate Facebook plugins (Like)
                FB.XFBML.parse();

                //AddClass in html tag when Facebook is ready
                $('html').addClass('fb-ready');

                //Your code
                app();

            };

            if( arguments.length == 2 ){
                this.loadSDK( arguments[0] );
            }else{
                this.loadSDK();
            }

        },

        on: function( eventName, method ){

            var self = this;
            this.handlers[ method ] = function(){ method.call( self ) };
            this.doc.on( eventName, this.handlers[ method ] );

        },

        off: function( eventName, method ){

            this.doc.off( eventName, this.handlers[ method ] );

        },

        trigger: function( eventName, datas ){

            this.doc.trigger( eventName, ( typeof datas != 'undefined' ) ? datas : [] );

        },

        loadSDK: function( locale ){

            var defaultLanguage = 'fr_FR',
                async = true,
                localeSDK = ( typeof locale != 'undefined' ) ? locale : defaultLanguage;

            //Load the Facebook SDK JS and add the tag "fb-root"
            (function(d, s, id){

                var js, tag = document.createElement('div');
                if (d.getElementById(id)) {return;}
                tag.id = 'fb-root';
                js = d.createElement(s); js.id = id; js.async = async;
                js.src = "//connect.facebook.net/" + localeSDK + "/all.js";
                d.getElementsByTagName('body')[0].appendChild( tag );
                d.getElementsByTagName('body')[0].appendChild( js );

            }(document, 'script', 'facebook-jssdk'));

        }

    };

    //Push _FB in window
    window._FB = _FB;

})( jQuery, window );
