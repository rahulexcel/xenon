(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('locations', locations);

    function locations($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/locations/:locationID', {}, {});
    }
    ;
})();