(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('orderDetailsController', orderDetailsController);
    function orderDetailsController($scope, $rootScope, $timeout, orderDetailsFactory, cancelOrderFactory, $state, orderDetailsService, localStorageService, $localStorage, arrayService) {
        console.log("Order Details Page");
        var singleOrderId = localStorageService.get('singleOrderId');
        console.log("Single Order id " + singleOrderId);
        if (singleOrderId) {
            $scope.loadingSpinner = true;
            $scope.hideMainContent = false;
            var query = orderDetailsFactory.get({"orderId": singleOrderId});
            query.$promise.then(function(data) {
                $scope.loadingSpinner = false;
                $scope.hideMainContent = true;
                console.log(data);
                $scope.orderDetails = data.products;
                $scope.orderId = data._id;
                $scope.ordernr = data.ordernr;
                $scope.cname = data.cfirstname + " " + data.clastname;
                $scope.cphone = data.cphone;
                $scope.totalAmount = data.subtotal;
                $scope.orderState = data.order_state;
                $scope.grandTotalAmount = data.total;
                $scope.vat = data.vat;
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

        $scope.cancelOrder = function(){
            console.log($scope.orderId);
            $scope.cancelOrderSpinner = true;
         var query = cancelOrderFactory.get({"orderId":$scope.orderId});
         query.$promise.then(function(data) {
                        console.log(data);
                        $state.go('dashboard.productOrders');
                      //  $state.go('dashboard.productOrders');
                    });
        };
        $scope.backTolist = function() {
            delete $localStorage.singleOrderId;
            $state.go('dashboard.productOrders');
        };
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