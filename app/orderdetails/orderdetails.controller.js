(function() {
   'use strict';
   
       angular.module('xenon-app')
       .controller('orderDetailsController', orderDetailsController);
        function orderDetailsController($scope, $rootScope, orderDetailsFactory) {
       		console.log("Order Details Page");
       		console.log("Single Order id "+$rootScope.singleOrderId);
          if($rootScope.singleOrderId){
            var query = orderDetailsFactory.get({"orderId":$rootScope.singleOrderId});
          var totalAmount = 0;
            query.$promise.then(function(data) {
                        console.log(data);
                $scope.orderDetails = data.products;
                for(var i =0; i < data.products.length; i++){
                  totalAmount = totalAmount+data.products[i].price;
                }
                $scope.totalAmount = totalAmount;
                var vatAmount = (totalAmount*12.9)/100;
                $scope.grandTotalAmount = totalAmount + vatAmount;
                    });
          }
       		
      		$scope.deleteOrder = function(){
      			console.log($rootScope.singleOrderId);
      			var query = orderDetailsFactory.deleteOrder({"orderId":$rootScope.singleOrderId});
      			query.$promise.then(function(data) {
                        console.log(data);
                    });
      		};



};

})();