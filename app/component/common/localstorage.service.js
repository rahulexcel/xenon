 (function() {
    'use strict';
    angular.module('xenon-app')
            .factory('localStorageService', localStorageService);

    function localStorageService($localStorage) {
        return {
            set: function(key, value) {
                $localStorage[key] = value;
            },
            get: function(key) {
                return $localStorage[key];
            },
            removeAll: function() {
                $localStorage.$reset();
            }
        }
    };

})();