(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('addProductFactory', addProductFactory);

    function addProductFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver+'/prod/:pname/:pdesc/:price/:pinv/:pinvdaily/:pcal/:pimages/:pfeatures', {},{});
    };
})();