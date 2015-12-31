(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('paymentFactory', paymentFactory);

    function paymentFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver+'/payments', {},{
        	authorize: {
                method: 'GET',
                isArray: false,
                url: Configurations.Hostserver + '/payments/authorize'
            }
        });
    };
})();