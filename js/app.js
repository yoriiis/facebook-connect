(function ($, window) {

	"use strict";

	$(document).on('ready', function(){

		_FB.ready(function(){
			
			_FB.init('XXXXXXXXXXXXXXX', '/me', 'email,user_birthday');

			$('.fb-connect').on('click', function(e){

				e.preventDefault();
				_FB.connect();

			});

			_FB.on('connected', function(){

				console.log( this.data );

			});

		});


	});

})( jQuery, window );