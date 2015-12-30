(function() {
   'use strict';
   angular.module('xenon-app')
       .run(function(userValidate, $rootScope, $state, localStorageService, $location) {
           userValidate.validUser();
           $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
               //event.preventDefault();
               console.log(toState.url);
               if (toState.url !== "/storeinfo") {
                   var userData = localStorageService.get("userData");
                   if (angular.isDefined(userData)) {
                       console.log(userData.locations.length);
                       if (userData.locations.length == 0) {
                           $location.path('/storeinfo');
                       }
                   }
               }
           });
       })
})();