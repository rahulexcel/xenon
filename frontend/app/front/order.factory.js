(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('Order', Order);

    function Order($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/order/:locationID', {}, {});
    }
    ;
})();