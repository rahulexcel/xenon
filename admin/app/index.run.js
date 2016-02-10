(function() {
    'use strict';
    angular.module('xenon-app')
            .run(function(userValidate, $rootScope, $state, localStorageService, fetchOrdersService, $location, $timeout, $interval) {
                userValidate.validUser();
                var userData = localStorageService.get("userData");
                if (angular.isDefined(userData)) {
                    if(userData.locations.length != 0){
                    fetchOrdersService.newOrders();
                     $interval(function() {
                        fetchOrdersService.newOrders();
                      }, 30000);                    
                    }    
                }

                $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                    //event.preventDefault(); 
                    // console.log(toState.url);
                    if (toState.url !== "/storeinfo") {
                        var userData = localStorageService.get("userData");
                        if (angular.isDefined(userData)) {
                            if (userData.locations.length == 0) {
                                $location.path('/storeinfo');
                                alertDanger();
                                function alertDanger(){
                                    $rootScope.location_id_is_not_available = true;
                                    $timeout(function() {
                                        $rootScope.location_id_is_not_available = false;
                                    }, 5000);
                                }
                            }
                            else {
                                $rootScope.location_id_is_not_available = false;
                            }
                        }
                    }
                });
            })
})();