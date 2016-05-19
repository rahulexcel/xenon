(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('productOrdersController', productOrdersController);
    function productOrdersController($scope, addOrderFactory, $localStorage,remainingStatusservice, orders, $interval, fetchOrdersService, localStorageService, orderListFactory, $rootScope, $state, orderDetailsFactory, arrayService) {
        //console.log("Product Orders Page");
        remainingStatusservice.remainingStatus();
        var userData = localStorageService.get('userData');
        var eid = userData.eid;
        var lid = userData.locations[0];
        var cid = userData.userid;
        $scope.spinner = true;

        var orderAm = [];
        var totalAmount;
        onpageLoadApi();
        function onpageLoadApi() {
            var query = orderListFactory.query({"storeId": lid});
            query.$promise.then(function(data) {
//                $scope.orderList = data;
                $scope.currencySymbole = arrayService.CurrencySymbol($localStorage.storeInfo.lcurrency);
                $scope.spinner = false;
            });
        }

        $scope.get_data_for_print = function() {
            $state.go('dashboard.print');

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
                //console.log(data);
                // $scope.spinner = false;
            });
        };
        $scope.orderId = function(orderId, order_state) {
            if (order_state == 15 || order_state == 3) {
                localStorageService.set('singleOrderId', orderId);
                $state.go('dashboard.orderDetails');
            } else {
                var query = orderDetailsFactory.editOrder({"orderId": orderId, "order_state": 3});
                query.$promise.then(function(data) {
                    fetchOrdersService.newOrders();
                    
                });
                localStorageService.set('singleOrderId', orderId);
                $state.go('dashboard.orderDetails');
            }
        };
        $scope.deleteOrder = function(orderId, index) {
            $scope.spinner = true;
            var query = orderDetailsFactory.deleteOrder({"orderId": orderId});
            query.$promise.then(function(data) {
                //console.log(data);
                onpageLoadApi();
                // $scope.orderList.splice(index, 1);
            });
        };
        var interval = $interval(function() {
            if (!$localStorage.userData)
                $interval.cancel(interval);
            else
                onpageLoadApi();
            //console.log('calling from page');
        }, 60000);
        
        
       
        var flag = 1;
        $(function() {
            function cb(start, end) {
                flag++;
                //console.log(flag);
                $scope.startdate = Date.parse(end);
                $scope.enddate = Date.parse(start);
                $scope.spinner = true;
                getOrders(flag, $scope.startdate, $scope.enddate);

                $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            }
            cb(moment().subtract(0, 'days'), moment());

            $('#reportrange').daterangepicker({
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            }, cb);

        });
        function getOrders(flag) {
            if (flag == 2) {
             $scope.enddate=new Date(moment().startOf('day')).getTime();
              updatetime();
            } else {
                var query4 = orders.save({
                    "to": $scope.startdate,
                    "from": $scope.enddate
                });
                query4.$promise.then(function(data) {
                    $scope.orderList = data.data;
                    $scope.spinner = false;
                    $rootScope.customerdata = data.data;
                });
            }
        }
          $interval(function() {
        if($scope.enddate==new Date(moment().startOf('day')).getTime()){
        updatetime();
       console.log("end date having value, updating");
       }else{
           console.log("not updating"); //console.log("no");
       }
     }, 180000);
     
        function updatetime() {
                var query5 = orders.save({
                    "to": new Date().getTime(),
                    "from": new Date(moment().startOf('day')).getTime()
                });
                query5.$promise.then(function(data) {
                    $scope.orderList = data.data;
                    $scope.spinner = false;
                    $rootScope.customerdata = data.data;
                     //console.log('yesss');
                });
         
        }

    };
})();