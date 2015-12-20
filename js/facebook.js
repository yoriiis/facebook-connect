/**
 *
 * Plugin:
 * @version 1.3
 *
 * @author: Joris DANIEL
 * @fileoverview: Easy way to use the Facebook API
 * Same support that Facebook API
 *
 * Copyright (c) 2014 Joris DANIEL
 * Licensed under the MIT license
 *
 **/

(function($, window) {

    "use strict";

    var _facebook = {};

    _facebook = {

        init: function(options, callback) {

            var self = this;

            this.options = $.extend({
                appID: '',
                locale: 'fr_FR',
                async: true,
                target: '/me',
                authorization: '',
                xfbml: true,
                status: true,
                version: 'v2.5',
                debug: false
            }, options);

            this.$doc = $(document);
            this.handlers = {};
            this.onFBReady = callback;
            this.status = null;
            this.datas = null;

            //On Facebook ready
            window.fbAsyncInit = function() {
                self.onFBAPIReady();
            };

            this.loadSDK();

        },

        onFBAPIReady: function() {

            var self = this;

            //Parse the DOM to instanciate Facebook plugins (Like)
            if (this.options.xfbml) {
                FB.XFBML.parse();
            }

            //AddClass in html tag when Facebook is ready
            $('html').addClass('fb-ready');

            FB.init({
                appId: this.options.appID,
                status: this.options.status,
                xfbml: this.options.xfbml,
                version: this.options.version
            });

            //OK everything is ready go on !
            this.onFBReady();

            //If status and user already granted, get data immediately
            if (!this.options.status) return;

            //Prevent Facebook API not ready
            setTimeout(function() {
                if (FB.getAuthResponse()) {
                    self.status = 'connected';
                    self.getDatas();
                }
            }, 500);

        },


        loadSDK: function() {

            var self = this,
                urlSDK = null;

            //Choose SDK with debug or not
            if (this.options.debug) {
                urlSDK = '//connect.facebook.net/' + self.options.locale + '/sdk/debug.js';
            } else {
                urlSDK = '//connect.facebook.net/' + self.options.locale + '/sdk.js'
            }

            //Load the Facebook SDK JS and add the tag "fb-root"
            (function(d, s, id) {
                var js, tag = document.createElement('div');
                if (d.getElementById(id)) return;
                tag.id = 'fb-root';
                js = d.createElement(s);
                js.id = id;
                js.async = self.options.async;
                js.src = urlSDK;
                d.getElementsByTagName('body')[0].appendChild(tag);
                d.getElementsByTagName('body')[0].appendChild(js);
            }(document, 'script', 'facebook-jssdk'));

        },

        connect: function() {

            var self = this;

            //Check status of Facebook connection
            FB.getLoginStatus(function(response) {

                //Status of the connection
                self.status = response.status;

                if (response.status === 'connected') {
                    self.getDatas();
                } else if (response.status === 'not_authorized') {
                    self.login();
                } else {
                    self.login();
                }

            });

        },

        login: function() {

            var self = this;

            //Facebook login function
            FB.login(function(response) {

                self.status = response.status;

                if (response.authResponse) {
                    self.getDatas();
                } else {

                    if (response.status === 'not_authorized') {
                        self.trigger('not_authorized', [self.status]);
                    }

                }

            }, {
                scope: this.options.authorization
            });

        },

        getDatas: function() {

            var self = this;

            //Call Open Grap API
            FB.api(this.options.target, function(response) {

                //Save user datas and status
                self.datas = response;

                //Trigger success event
                self.trigger('connected', [self.datas, self.status]);

            });

        },

        on: function(eventName, method) {
            var self = this;
            this.handlers[method] = function() {
                method.apply(self, arguments)
            };
            this.$doc.on(eventName, this.handlers[method]);
        },

        off: function(eventName, method) {
            this.$doc.off(eventName, this.handlers[method]);
        },

        trigger: function(eventName, datas) {
            this.$doc.trigger(eventName, (typeof datas !== 'undefined') ? datas : []);

        }

    };

    //Push _facebook in window
    window._facebook = _facebook;

})(jQuery, window);
