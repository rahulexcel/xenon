(function() {
    'use strict';
    angular.module('xenon-app')
            .factory('cancelOrderFactory', cancelOrderFactory);

    function cancelOrderFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/cancelorder/:orderId', {
            'orderId': '@orderId'
        }, {});
    }
    ;
})();