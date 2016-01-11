(function() {
    'use strict';
    angular.module('xenon-app')
            .factory('loginFactory', loginFactory);

    function loginFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/token/:email/:password', {}, {});
    }
    ;
})();