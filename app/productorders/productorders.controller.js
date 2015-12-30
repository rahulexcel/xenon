(function() {
   'use strict';
   
       angular.module('xenon-app')
       .controller('productOrdersController', productOrdersController);
        function productOrdersController($scope, addOrderFactory, localStorageService, orderListFactory, $rootScope, $state) {
       		console.log("Product Orders Page");
       		    var userData = localStorageService.get('userData');
       			var eid = userData.eid;
       			var lid = userData.locations[0];
       			var cid = userData.userid;
       			$scope.spinner = true;
       			var orderAm=[];
            var totalAmount = 0;
				var query = orderListFactory.query({"storeId":lid});
      			query.$promise.then(function(data) {
                        console.log(data);
		       			$scope.spinner = false;
                        $scope.orderList = data;
                        for(var i=0; i < data.length; i++){
                          for (var j = 0; j < data[i].products.length; j++) {
                            // console.log(data[i].products[j].price);
                            totalAmount = totalAmount+data[i].products[j].price;
                          }
                        }
                        console.log(totalAmount);
                    });


       		$scope.addOrder = function(){
       			var query = addOrderFactory.save({
							 "eid": eid,
							 "lid":lid,
							 "cid":cid,
							 "cphone":22556699,
							 "ccountrycode":47,
							 "products":[{"_id":"5680ebe7542984d82d137f19","price":333,"pname":"This is updatedcdsxc","pinv":20},{"_id":"5680ec9c542984d82d137f1b","price":20,"pname":"This is product four","pinv":33},{"_id":"568113ffef739a042b06aabc","price":10,"pname":"This a","pinv":33}],
							 "smsverified":true,
							 "paid":true,
							 "pickuptime":"2015-12-17T09:01:50.261Z"
							});
      			query.$promise.then(function(data) {
                        console.log(data);
                        // $scope.spinner = false;
                    });
       		};
       		$scope.orderId = function(orderId){
       			console.log(orderId);
       			$rootScope.singleOrderId = orderId;
       			$state.go('dashboard.orderDetails');
       		};
};

})();