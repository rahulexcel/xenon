(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('existingcharge', existingcharge);

    function existingcharge($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/existingcharge', {}, {});
    }
    ;
})();