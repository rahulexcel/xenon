(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('printctrl', printctrl);
    function printctrl($scope,  $timeout, $state, $rootScope) {
        if(!$scope.customerdata){
          $state.go("dashboard.productOrders");
        }
         console.log($rootScope.customerdata);
         for(var i=0; i<$rootScope.customerdata.length; i++){
             console.log($rootScope.customerdata[i].time);
               var time=$rootScope.customerdata[i].time.substring(11, 16);
              var date=$rootScope.customerdata[i].time.substring(0, 10);             
              
             $rootScope.customerdata[i].time= date+" "+"At"+" " +time+" " +"Hours";
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