(function() {
    'use strict';
    angular.module('xenon-frontend')
        .run(function($rootScope, $state, $localStorage, $timeout, validate) {

           validate.order_placed();
           
            // $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            //     if (toState.url !== "/frontend") {
            //         if (angular.isDefined($localStorage.Orders_response)) {}
            //             else{
            //                 $state.go("frontend");
            //                  alertDanger();
            //                  function alertDanger(){
            //                         $rootScope.Order_not_placed = true;
            //                          $timeout(function() {
            //                          $rootScope.Order_not_placed = false;
            //                          $rootScope.spinner=false;
            //                             }, 5000);
                                
            //             }
                        
            //         }
            //     }
            // });
        })
})();