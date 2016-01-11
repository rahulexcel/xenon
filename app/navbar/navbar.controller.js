(function() {
    'use strict';

    angular.module('xenon-app').
            controller('navbarController', navbarController);
    function navbarController($scope, $rootScope, ajaxRequest, loginFactory, localStorageService, $log, $state)
    {
        $log.debug('Navbar Controller');
        $scope.logout = function() {
            localStorageService.removeAll();
            $rootScope.userNavMenu = false;
            $rootScope.navMenu = true;
            $state.go('dashboard.login');
        };
        $scope.goLogin = function() {
            $state.go('dashboard.login');
        };
        $scope.goSignUp = function() {
            $state.go('dashboard.singup');
        };
         $scope.goReset = function() {
            $state.go('dashboard.reset');
        };
    }
})();