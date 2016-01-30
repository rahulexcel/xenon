(function() {
    'use strict';
    angular.module('xenon-frontend')
        .factory('dropdownService', dropdownService);

    function dropdownService() {
        var minutes_is_more = 0;
        var service = {};
        var selected_hour;
        var first_hour;
        service.Daydropdown = function() {
            var Daydropdown = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            return Daydropdown;
        }
        service.Timedropdown = function() {
            var hour = [];
            console.log(minutes_is_more);
            var current = new Date().getHours();
            var time;
            if (minutes_is_more == 1) {
                for (var i = current + 1; i <= 23; i++) {
                    time = i;
                    hour.push(time);
                }
                selected_hour = hour[0];
            } else {
                for (var i = current; i <= 23; i++) {
                    time = i;
                    hour.push(time);
                }
                selected_hour = hour[0];

            }
            console.log(selected_hour);
            return hour;
        }
        service.minutesdropdown = function(llt) {
            var minutes = [];
            var minutesInterval = new Date().getMinutes();
            var time;
            console.log(minutesInterval+llt);
            minutesInterval=minutesInterval;
            if (minutesInterval + llt > 60) {
                minutes_is_more = 1;
                minutesInterval= 60 -minutesInterval;

                //minutes.push(minutesInterval);
            }else{
            //minutes.push(minutesInterval + llt);
          }
            for (var i = 0; i < 4; i++) {

                minutesInterval = minutesInterval+15;
                if(minutesInterval<60){
                minutes.push(minutesInterval);
              }
            }
            console.log(minutes);
            return minutes;
        }
        service.Selected = function(llt) {
            console.log(selected_hour.toString());
            return selected_hour.toString();

        }
        service.delivery_method = function() {
            var method = ['Delivery', "Pickup"];
            return method;
        }

service.selectedMinutes = function(data) {
          
            return data[0].toString();

}
        return service;
    }
})();