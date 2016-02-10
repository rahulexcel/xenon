(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('productOrdersController', productOrdersController);
    function productOrdersController($scope, addOrderFactory, $localStorage, $interval, fetchOrdersService, localStorageService, orderListFactory, $rootScope, $state, orderDetailsFactory, arrayService) {
        console.log("Product Orders Page");
        var userData = localStorageService.get('userData');
        var eid = userData.eid;
        var lid = userData.locations[0];
        var cid = userData.userid;
        $scope.spinner = true;
        var orderAm = [];
        var totalAmount;
        onpageLoadApi();
        fetchOrdersService.newOrders();
        function onpageLoadApi(){
            var query = orderListFactory.query({"storeId": lid});
            query.$promise.then(function(data) {
                    $scope.orderList = data;
                    $scope.currencySymbole = arrayService.CurrencySymbol($localStorage.storeInfo.lcurrency);
                    $scope.spinner = false;
                    fetchOrdersService.newOrders();
            });
        }

        $scope.addOrder = function() {
            var query = addOrderFactory.save({
                "eid": eid,
                "lid": lid,
                "cid": cid,
                "cphone": 22556699,
                "ccountrycode": 47,
                "products": [{"_id": "5680ebe7542984d82d137f19", "price": 456, "pname": "This is updatedcdsxc", "pinv": 20}, {"_id": "5680ec9c542984d82d137f1b", "price": 20, "pname": "This is product four", "pinv": 33}, {"_id": "568113ffef739a042b06aabc", "price": 10, "pname": "This a", "pinv": 33}],
                "smsverified": true,
                "paid": true,
                "pickuptime": "2015-12-17T09:01:50.261Z"
            });
            query.$promise.then(function(data) {
                console.log(data);
                // $scope.spinner = false;
            });
        };
        $scope.orderId = function(orderId) {
            fetchOrdersService.newOrders();
            var query = orderDetailsFactory.editOrder({"orderId": orderId,"order_state":3});
            query.$promise.then(function(data) {
                //console.log(data);
            });
            // console.log(orderId);
            localStorageService.set('singleOrderId', orderId);
            $state.go('dashboard.orderDetails');
        };
        $scope.deleteOrder = function(orderId, index) {
            $scope.spinner = true;
            var query = orderDetailsFactory.deleteOrder({"orderId": orderId});
            query.$promise.then(function(data) {
                console.log(data);
                onpageLoadApi();
                // $scope.orderList.splice(index, 1);
            });
        };
        $interval(function() {
            onpageLoadApi();
        }, 60000); 


    };

})();