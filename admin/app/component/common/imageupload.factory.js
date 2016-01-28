(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('imageUploadFactory', imageUploadFactory);

    function imageUploadFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver+'/prodfile', {},{});
    };
})();