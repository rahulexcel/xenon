(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('addOrderFactory', addOrderFactory);

    function addOrderFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver+'/orders/:eid/:lid/:cid/:cphone/:ccountrycode/:products/:smsverified/:paid/:pickuptime', {},{});
    };
})();