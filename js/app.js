(function ($, window) {

	"use strict";

	$(document).on('ready', function(){

		_FB.ready(function(){
			
			_FB.init('APP_ID');

			$('.fb-connect').on('click', function(e){

				e.preventDefault();

				_FB.getLoginStatus('/me', 'email,user_birthday', function(){
					
					console.log( _FB.data );

				});

			});

		});

	});

})( jQuery, window );