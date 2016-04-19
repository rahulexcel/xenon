(function() {
    'use strict';
    angular.module('xenon-app')
            .run(function(userValidate, $rootScope,remainingStatusservice, $state, localStorageService, fetchOrdersService, $location, $timeout, $interval) {
                userValidate.validUser();
                remainingStatusservice.remainingStatus();
                var userData = localStorageService.get("userData");
                if (angular.isDefined(userData)) {
                    if(userData.locations.length != 0){
                    fetchOrdersService.newOrders();
                     // $interval(function() {
                     //    fetchOrdersService.newOrders();
                     //    console.log('calling from run');
                     //  }, 60000);                    
                    }    
                }

                $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                    //event.preventDefault(); 
                    // console.log(toState.url);
                    function alertDanger(){
                                    $rootScope.location_id_is_not_available = true;
                                    $timeout(function() {
                                        $rootScope.location_id_is_not_available = false;
                                    }, 5000);
                                }
                    // if (toState.url !== "/storeinfo") {
                    //     var userData = localStorageService.get("userData");
                    //     if (angular.isDefined(userData)) {
                    //         if (userData.locations.length == 0) {
                    //             $location.path('/storeinfo');
                    //             alertDanger();
                    //         }
                    //         else {
                    //             $rootScope.location_id_is_not_available = false;
                    //         }
                    //     }
                    // }

                    if (toState.url !== "/welcome") {
                        var userData = localStorageService.get("userData");
                        if (angular.isDefined(userData)) {
                            if (userData.locations.length == 0) {
                                if(toState.url == "/welcome"){
                                    $location.path('dashboard/welcome');
                                }
                                if(toState.url == "/storeinfo"){
                                    $location.path('dashboard/storeinfo');
                                }
                                if(toState.url == '/setting' || toState.url == '/payment' || toState.url == '/productList' || toState.url == '/addProduct'
                                        || toState.url == '/productOrders' || toState.url == '/orderDetails' || toState.url == '/plans'){
                                    $location.path('dashboard/welcome');
                                }
                            }
                            else {
                                // $rootScope.location_id_is_not_available = false;
                            }
                        }
                    }
                });
            })
})();