(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('calanderService', calanderService);
    function calanderService() {
        var service = {};
        service.getcalanderService = function(event, date, dateArray) {
            console.log(dateArray);
            event.preventDefault();
            var timeStamp = date.valueOf();
            var day = new Date(timeStamp).getDate();
            var month = new Date(timeStamp).getMonth() + 1;
            var year = new Date(timeStamp).getFullYear();
            var i;
            var fullDate = day + "-" + month + "-" + year;
            var DateFlag = 0;
            for (i = 0; i < dateArray.length; i++) {
                if (dateArray[i] === fullDate) {
                    var idx = dateArray.indexOf(fullDate);
                    dateArray.splice(idx, 1);
                    DateFlag = 1;
                }
            }
            if (DateFlag == 0) {
                dateArray.push(fullDate);
            }
            date.selected = !date.selected;
            return dateArray;
        }
        return service;
    }
})();