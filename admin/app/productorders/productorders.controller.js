(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('productOrdersController', productOrdersController);
    function productOrdersController($scope, userValidate, addOrderFactory, localStorageService, orderListFactory, $rootScope, $state, orderDetailsFactory) {
        console.log("Product Orders Page");
        userValidate.validUserController();
        var userData = localStorageService.get('userData');
        var eid = userData.eid;
        var lid = userData.locations[0];
        var cid = userData.userid;
        $scope.spinner = true;
        var orderAm = [];
        var totalAmount;
        var query = orderListFactory.query({"storeId": lid});
        query.$promise.then(function(data) {
            $scope.spinner = false;

            for (var i = 0; i < data.length; i++) {
                totalAmount = 0;
                for (var j = 0; j < data[i].products.length; j++) {

                    totalAmount = totalAmount + data[i].products[j].price;
                }
                data[i].totalamount = totalAmount;
                // console.log(data[i]);
            }
            $scope.orderList = data;
        });


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
            console.log(orderId);
            $rootScope.singleOrderId = orderId;
            $state.go('dashboard.orderDetails');
        };
        $scope.deleteOrder = function(orderId, index) {
            var query = orderDetailsFactory.deleteOrder({"orderId": orderId});
            query.$promise.then(function(data) {
                console.log(data);
                $scope.orderList.splice(index, 1);
            });
        };
    };

})();