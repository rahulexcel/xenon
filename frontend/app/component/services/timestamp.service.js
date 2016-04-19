(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('timeService', timeService);
    function timeService($localStorage) {
        var service = {};
        service.getTimestamp = function(time, minutes) {
            var selected_time = time + ":" + minutes;
            var day = new Date().getDate();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            var full_date = month + '/' + day + "/" + year;
            var TimeStamp = new Date(full_date + " " + selected_time).getTime();
            // ////console.log(TimeStamp);
            return TimeStamp;
        }
        service.closedDaysCheckoutButton = function(closedDaysArray) {
            ////console.log(closedDaysArray);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            // if(dd<10) {
            //     dd='0'+dd
            // }
            // if(mm<10) {
            //     mm='0'+mm
            // } 
            today = dd + '-' + mm + '-' + yyyy;
            for (var i = 0; i < closedDaysArray.length; i++) {
                if (today == closedDaysArray[i]) {
                    return true;
                    break;
                }
            }
            return false;
        }
        service.weekdaysOpningTime = function(weekdaysOpningTimeArray) {
            // ////console.log(weekdaysOpningTimeArray);
            var now = new Date();
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var day = days[ now.getDay() ];
            // ////console.log(day);
            for (var i = 0; i < weekdaysOpningTimeArray.length; i++) {
                if (day == weekdaysOpningTimeArray[i].day) {
                    // ////console.log('match');
                    var openingTime = weekdaysOpningTimeArray[i].opening_time;
                    var closingTime = weekdaysOpningTimeArray[i].closing_time;
                    break;
                }
            }
            if (openingTime && closingTime) {
                var d = new Date();
                var currentHour = d.getHours();
                ////console.log(currentHour);
                if (currentHour < openingTime) {
                    ////console.log('Store is not open yet');
                    return true;
                }
                if (currentHour >= closingTime) {
                    ////console.log('Store is closed For today');
                    return true;
                }
                return false;
            }
        }
        service.todayDay = function() {
            var d = new Date();
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            var n = weekday[d.getDay()];
            //console.log(n);
            for(var i=0; i<$localStorage.frontStoreData.lwots.length; i++){
                if($localStorage.frontStoreData.lwots[i].day===n){
                    //console.log($localStorage.frontStoreData.lwots[i].closing_time);
                    return $localStorage.frontStoreData.lwots[i].closing_time;
                }
            }
            
            
        }
        return service;
    }
})();

