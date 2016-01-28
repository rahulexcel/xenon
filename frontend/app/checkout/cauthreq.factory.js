(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('cauthreq', cauthreq);

    function cauthreq($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/cauthreq', {}, {});
    }
    ;
})();