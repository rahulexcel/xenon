(function() {
    'use strict';

    angular.module('xenon-app').
            controller('navbarController', navbarController);
    function navbarController($scope, $rootScope, ajaxRequest, loginFactory, localStorageService, $log, $state)
    {
        console.log($state.current.name);
       
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
        if(localStorageService.get('storeInfo')){
            console.log('storeInfo present');
            $scope.showMyStoreNav = true;
            var storeInfo = localStorageService.get('storeInfo');
            $scope.ldomain = storeInfo.ldomain;
        } else{
            $scope.showMyStoreNav = false;
        }
        

    }
})();