(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('category', category);

    function category($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/category/loc/:locationID', {}, {});
    }
    ;
})();