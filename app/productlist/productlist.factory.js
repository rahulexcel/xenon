(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('productListFactory', productListFactory);

    function productListFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver+'/locations/products/:locationid', {},{});
    };
})();