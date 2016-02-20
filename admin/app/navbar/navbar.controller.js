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
            //console.log('storeInfo present');
            $rootScope.showMyStoreNav = false;
            var storeInfo = localStorageService.get('storeInfo');
            $scope.ldomain = storeInfo.ldomain;
        } else{
            $rootScope.showMyStoreNav = true;
        }
        $scope.goToMyStore = function(){
            if(localStorageService.get('storeInfo')){
                console.log('store info is present');
                var storeInfo = localStorageService.get('storeInfo');
                window.open('https://'+storeInfo.ldomain);
            } else{
                console.log('store info is not present');
            }
        }

    }
})();