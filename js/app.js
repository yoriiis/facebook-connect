(function ($, window) {

	"use strict";

	$(document).on('ready', function(){

		_FB.ready('en_US', function(){
			
			_FB.init('XXXXXXXXXXXXXXX', '/me', 'email,user_birthday');

			$('.fb-connect').on('click', function(e){

				e.preventDefault();
				_FB.connect();

			});

			_FB.on('connected', function(){

				console.log( this.data );

			});

			_FB.on('not_authorized', function(){

				console.log( 'not_authorized' );

			});

		});


	});

})( jQuery, window );