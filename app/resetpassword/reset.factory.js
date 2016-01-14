(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('resetFactory', resetFactory);
    function resetFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver+'/reset/:token', {},{});
    };
})();