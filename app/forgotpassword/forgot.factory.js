(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('forgotFactory', forgotFactory);

    function forgotFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver+'/forgot/:email', {},{});
    };
})();