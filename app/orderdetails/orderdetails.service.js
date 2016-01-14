(function() {
    'use strict';
    angular.module('xenon-app')
            .factory('orderDetailsService', orderDetailsService);

    function orderDetailsService() {
        var service = {};
        service.orderDate = function(data) {
            var timeStamp = Math.round(new Date(data).getTime() / 1000);
            var day = new Date(timeStamp * 1000).getDate();
            var month = new Date(timeStamp * 1000).getMonth() + 1;
            var year = new Date(timeStamp * 1000).getFullYear();
            var fullDate = day + "-" + month + "-" + year;
            return fullDate;
        };
        return service;
    }
})();