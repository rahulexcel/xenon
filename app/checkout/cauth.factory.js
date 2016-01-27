(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('cauth', cauth);

    function cauth($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/cauth', {}, {});
    }
    ;
})();