(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('printctrl', printctrl);
    function printctrl($scope,  $timeout, $state) {
        if(!$scope.customerdata){
          $state.go("dashboard.productOrders");
        }
        $scope.print = function(){
            console.log('print');
            $scope.onPrint = true;
            $timeout(function() {
            window.print();
            }, 0);
            $timeout(function() {
            $scope.onPrint = false;
            }, 0);
        };
    };

})();