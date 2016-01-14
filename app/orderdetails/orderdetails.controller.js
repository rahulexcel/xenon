(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('orderDetailsController', orderDetailsController);
    function orderDetailsController($scope, $rootScope, userValidate, orderDetailsFactory, $state, orderDetailsService, localStorageService) {
        console.log("Order Details Page");
        userValidate.validUserController();
        console.log("Single Order id " + $rootScope.singleOrderId);
        if ($rootScope.singleOrderId) {
            var query = orderDetailsFactory.get({"orderId": $rootScope.singleOrderId});
            var totalAmount = 0;
            query.$promise.then(function(data) {
                console.log(data);
                $scope.orderDetails = data.products;
                for (var i = 0; i < data.products.length; i++) {
                    totalAmount = totalAmount + data.products[i].price;
                }
                $scope.totalAmount = totalAmount;
                var vatAmount = (totalAmount * 12.9) / 100;
                $scope.grandTotalAmount = totalAmount + vatAmount;
                $scope.orderDate = orderDetailsService.orderDate(data.created);
                var storeInfo = localStorageService.get('storeInfo');
                $scope.storeAddress = storeInfo.data.laddr;
                $scope.storeCountry = storeInfo.data.lcountry;
                $scope.storeEmail = storeInfo.data.lemail;
                $scope.storePhone = storeInfo.data.lphone;
                $scope.storeName = storeInfo.data.lname;
            });
        }

        // $scope.deleteOrder = function(){
        // 	console.log($rootScope.singleOrderId);
        // 	var query = orderDetailsFactory.deleteOrder({"orderId":$rootScope.singleOrderId});
        // 	query.$promise.then(function(data) {
        //                 console.log(data);
        //                 $state.go('dashboard.productOrders');
        //             });
        // };
        $scope.backTolist = function() {
            $state.go('dashboard.productOrders');
        };



    }
    ;

})();