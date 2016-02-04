(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('dropdownService', dropdownService);

    function dropdownService() {
        var minutes_is_more = 0;
        var service = {};
        var selected_hour;
        var first_hour;
        var selected_mintue;
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
            var sumllt = minutesInterval + llt;
            var finalminutes = 0;
            console.log("previous=" + sumllt);
            for (var i = 0; i < 16; i++) {
                if (sumllt % 15 !== 0) {
                    sumllt++;
                }
            }
            console.log(sumllt);
            if (sumllt > 59) {
                sumllt = sumllt - 60;
                console.log(sumllt);
                minutes_is_more = 1;
                if (sumllt == 15) {
                    minutes.push(15, 30, 45);
                }
                if (sumllt == 30) {
                    minutes.push(30, 45);
                }
                if (sumllt == 45) {
                    minutes.push(45);
                }
                if (sumllt == 0) {
                    minutes.push('00', 15, 30, 45);
                }
            } else {
                if (sumllt == 15) {
                    minutes.push(15, 30, 45);
                }
                if (sumllt == 30) {
                    minutes.push(30, 45);
                }
                if (sumllt == 45) {
                    minutes.push(45);
                }
            }
            console.log(minutes);
            //       console.log(minutesInterval+llt);
            //       if (minutesInterval + llt > 59) {
            //           minutes_is_more = 1;
            //           minutesInterval= minutesInterval+llt-60;
            //           for(var i=0; i<15; i++){
            //           if(minutesInterval%15!==0){


            //          }

            //     }
            //           console.log(minutesInterval) ;
            //       }else{
            //           minutesInterval=minutesInterval+llt;
            //          for(var i=0; i<15; i++){
            //           if(minutesInterval%15!==0){
            //               if(minutesInterval!==60){
            //               minutesInterval++;      
            //               }
            //               // minutesInterval++;
            //          }

            //     }
            // }
            //     minutes.push(minutesInterval);
            //       for (var i = 0; i < 4; i++) {
            //           minutesInterval = minutesInterval+15;
            //           if(minutesInterval<59){
            //           minutes.push(minutesInterval);
            //         }
            //       }
            //       console.log(minutes);
            selected_mintue = minutes[0].toString();
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

            return  selected_mintue;

        }
        service.currenttime = function(data) {
            console.log(selected_hour);
            return  selected_hour.toString();

        }
        service.changedMinutes = function(data) {
            var minutes = [];
            var num = 0;
            minutes.push("00");
            for (var i = 1; i <= 3; i++) {
                num = num + 15;
                minutes.push(num);
            }

            console.log(minutes);
            return minutes;
        }
        return service;
    }
})();