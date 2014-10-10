(function($, window) {

    "use strict";

    $(document).on('ready', function() {

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
        }, function() {

            $('.fb-connect').on('click', function(e) {
                e.preventDefault();
                _facebook.connect();
            });

            _facebook.on('connected', function(e, datas, status) {
                console.log(datas, status);
            });

            _facebook.on('not_authorized', function(e, status) {
                console.log("error::", status);
            });

        });

    });

})(jQuery, window);
