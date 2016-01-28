(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('orderDetailsFactory', orderDetailsFactory);

    function orderDetailsFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver+'/orders/:orderId', {},{
            editOrder: {
                method: 'PUT',
                isArray: false,
                url: Configurations.Hostserver + '/orders/:orderId'
            },
            deleteOrder: {
                method: 'DELETE',
                isArray: false,
                url: Configurations.Hostserver + '/orders/:orderId'
            }
        });
    };
})();