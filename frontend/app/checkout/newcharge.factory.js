(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('newcharge1', newcharge1);

    function newcharge1($resource, Configurations) {
        console.log("i am claiing");
        return $resource(Configurations.Hostserver + '/newcharge', {}, {});

    }
    ;
})();