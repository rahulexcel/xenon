(function() {
    'use strict';
    angular.module('xenon-app')
        .run(function(userValidate, $rootScope, $state, localStorageService, $location, $timeout) {
            userValidate.validUser();

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                //event.preventDefault();
                                             function alertDanger(){
                                    $rootScope.location_id_is_not_available = true;
                                     $timeout(function() {
                                     $rootScope.location_id_is_not_available = false;
                                        }, 5000);
                                }

                console.log(toState.url);
                if (toState.url !== "/storeinfo") {
                    var userData = localStorageService.get("userData");
                    if (angular.isDefined(userData)) {
                        console.log(userData.locations.length);
                        if (userData.locations.length == 0) {
                            $location.path('/storeinfo');
                             alertDanger();
                        }
                        else{
                            $rootScope.location_id_is_not_available=false;
                        }
                    }
                }
            });
        })
})();