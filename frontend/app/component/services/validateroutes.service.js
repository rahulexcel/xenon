(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('validate', validate);
    function validate($rootScope, $state, $localStorage, $timeout) {
        return{
            order_placed: function() {
                $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                    function alertDanger() {
                        $state.go("frontend");
                        $rootScope.Order_not_placed = true;
                        $timeout(function() {
                            $rootScope.Order_not_placed = false;
                            $rootScope.spinner = false;
                        }, 5000);
                    }
                    if (toState.url !== "/frontend") {
                        if (angular.isDefined($localStorage.Orders_sent)) {
                            console.log($localStorage.Orders_sent.length);
                            if ($localStorage.Orders_sent.length === 0) {
                                console.log("it is 0");
                                alertDanger();

                            }

                        }
                        else {

                            alertDanger();

                        }

                    }

                });
            }}
    }
})();