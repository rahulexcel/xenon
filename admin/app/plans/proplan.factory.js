(function() {
    'use strict';
    angular.module('xenon-app')
            .factory('proPlanFactory', proPlanFactory);

    function proPlanFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/plancharge/:stripeToken', {}, {});
    }
    ;
})();