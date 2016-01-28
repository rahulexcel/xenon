  (function() {
    'use strict';
    angular.module('xenon-frontend')
    .factory('validate', validate);
    function validate($rootScope, $state, $localStorage, $timeout){
        return{
            order_placed: function(){
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                function alertDanger(){
                                    $rootScope.Order_not_placed = true;
                                     $timeout(function() {
                                     $rootScope.Order_not_placed = false;
                                     $rootScope.spinner=false;
                                        }, 5000);
                if (toState.url !== "/frontend") {
                    if (angular.isDefined($localStorage.Orders_response)) {}
                        else{
                            $state.go("frontend");
                             alertDanger();                                
                        }
                        
                    }
                }
            });
}}
}
  })();