(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('categoryListFactory', categoryListFactory);

    function categoryListFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/cats/loc/:locationId', {
            'locationId': '@locationId'
        }, {});
    };
})();