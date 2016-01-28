(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('addCategoryFactory', addCategoryFactory);

    function addCategoryFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/cats/:catname/:lid/:catproducts/:index', {}, {});
    };
})();