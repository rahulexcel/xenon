(function() {
   'use strict';
   angular.module('xenon-app')
       .factory('userValidate', userValidate);
   function userValidate(localStorageService, $state, $stateParams, $rootScope, $location) {
       return {
           validUser: function() {
               var userData = localStorageService.get('userData');
               if (userData) {
                   console.log('hai');
                   $rootScope.userNavMenu = true;
                   $rootScope.navMenu = false;
               } else {
                   console.log('nhi');
                  // $location.path('/login');
                   //$state.go('dashboard.login');
                   $rootScope.userNavMenu = false;
                   $rootScope.navMenu = true;
               }                
           },
           validUserController: function() {
               var userData = localStorageService.get('userData');
               if (userData) {
                   console.log('Controller hai');
                   $rootScope.userNavMenu = true;
                   $rootScope.navMenu = false;
               } else {
                   console.log('Controller  nhi');
                  $location.path('/login');
                   //$state.go('dashboard.login');
                   $rootScope.userNavMenu = false;
                   $rootScope.navMenu = true;
               }                
           }

       }
   }

})();