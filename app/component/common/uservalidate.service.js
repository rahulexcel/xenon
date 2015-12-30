(function() {
   'use strict';
   angular.module('xenon-app')
       .factory('userValidate', userValidate);

   function userValidate(localStorageService, $state, $stateParams, $rootScope, $location) {

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
           },
           validUser1: function() {
               var userData = localStorageService.get('userData');
            
               if (userData) {
                   console.log('hai');
                   $rootScope.userNavMenu = true;
                   $rootScope.navMenu = false;
               } else {
                   console.log('nhi');
                   // $state.go('dashboard.login');
                   $location.path('/login');
                   $rootScope.userNavMenu = false;
                   $rootScope.navMenu = true;
               }                
           }
       }
   }

})();