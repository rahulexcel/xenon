(function() {
    'use strict';
    angular.module('xenon-app')
            .factory('orderDetailsService', orderDetailsService);

    function orderDetailsService(localStorageService) {
        var service = {};
        service.orderDate = function(data) {
            var timeStamp = Math.round(new Date(data).getTime() / 1000);
            var day = new Date(timeStamp * 1000).getDate();
            var month = new Date(timeStamp * 1000).getMonth() + 1;
            var year = new Date(timeStamp * 1000).getFullYear();
            var fullDate = day + "-" + month + "-" + year;
            return fullDate;
        };
        service.grandTotalAmount = function(totalAmount, deliverymode, deliveryrate, deliverytax) {
            var grandTotalAmount = 0;
            console.log(deliveryrate +" "+deliverytax);
            if(deliverymode == 2){
                if(deliveryrate && deliverytax){
                    grandTotalAmount = totalAmount + deliveryrate + (deliveryrate*deliverytax)/100;
                }
            } else{
                grandTotalAmount = totalAmount;
            }
            return grandTotalAmount;
        };
        return service;
    }
})();