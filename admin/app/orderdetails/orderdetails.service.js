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
        service.grandTotalAmount = function(totalAmount) {
            var grandTotalAmount = 0;
            var storeInfo = localStorageService.get('storeInfo');
            if(storeInfo.ltaxall){
                grandTotalAmount = totalAmount;
            } else{
                var vatAmount = (totalAmount * 12.9) / 100;
                grandTotalAmount = totalAmount + vatAmount;
            }
            return grandTotalAmount;
        };
        return service;
    }
})();