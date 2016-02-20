(function() {
    'use strict';
    angular.module('xenon-app')
            .factory('basicPlanFactory', basicPlanFactory);

    function basicPlanFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/planbasic', {}, {});
    }
    ;
})();