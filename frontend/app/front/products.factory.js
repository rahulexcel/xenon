(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('products', products);

    function products($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/locations/products/:locationID', {}, {});
    }
    ;
})();