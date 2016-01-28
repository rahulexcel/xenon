(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('newcharge', newcharge);

    function newcharge($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/newcharge', {}, {});
    }
    ;
})();