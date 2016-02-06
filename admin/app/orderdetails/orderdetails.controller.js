(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('orderDetailsController', orderDetailsController);
    function orderDetailsController($scope, $rootScope, orderDetailsFactory, $state, orderDetailsService, localStorageService, $localStorage, arrayService) {
        console.log("Order Details Page");
        var singleOrderId = localStorageService.get('singleOrderId');
        console.log("Single Order id " + singleOrderId);
        if (singleOrderId) {
            $scope.loadingSpinner = true;
            $scope.hideMainContent = false;
            var query = orderDetailsFactory.get({"orderId": singleOrderId});
            var totalAmount = 0;
            query.$promise.then(function(data) {
                $scope.loadingSpinner = false;
                $scope.hideMainContent = true;
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
                $scope.storeAddress = storeInfo.laddr;
                $scope.storeCountry = storeInfo.lcountry;
                $scope.storeEmail = storeInfo.lemail;
                $scope.storePhone = storeInfo.lphone;
                $scope.storeName = storeInfo.lname;
                $scope.currencySymbole = arrayService.CurrencySymbol($localStorage.storeInfo.lcurrency);
            });
        }

        // $scope.deleteOrder = function(){
        //  console.log($rootScope.singleOrderId);
        //  var query = orderDetailsFactory.deleteOrder({"orderId":$rootScope.singleOrderId});
        //  query.$promise.then(function(data) {
        //                 console.log(data);
        //                 $state.go('dashboard.productOrders');
        //             });
        // };
        $scope.backTolist = function() {
            delete $localStorage.singleOrderId;
            $state.go('dashboard.productOrders');
        };



    }
    ;

})();