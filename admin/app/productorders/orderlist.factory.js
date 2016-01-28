(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('orderListFactory', orderListFactory);

    function orderListFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver+'/orders/store/:storeId', {},{});
    };
})();