(function() {
    'use strict';
    angular.module('xenon-frontend')
        .factory('timeService', timeService);
    function timeService() {
        var service = {};
        service.getTimestamp = function(time) {
            var day = new Date().getDate();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            var full_date = month + '/' + day + "/" + year;
            var TimeStamp = new Date(full_date + " " + time).getTime();
            console.log(TimeStamp);

            return TimeStamp;
        }
       
        return service;
    }
})();