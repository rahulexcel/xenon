(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('userValidate', userValidate);

    function userValidate(localStorageService, $state, $stateParams, $rootScope) {

        return {
            validUser: function(currentState) {
                var userData = localStorageService.get('userData');
                if (userData) {
                    $state.go('dashboard.storeinfo');
                    $rootScope.userNavMenu = true;
                    $rootScope.navMenu = false;
                } else {
                    $state.go('dashboard.login');
                    $rootScope.userNavMenu = false;
                    $rootScope.navMenu = true;
                }                
            }
        }
    }

})();