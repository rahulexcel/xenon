(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('dropdownService', dropdownService);
    function dropdownService() {
        var service = {};
        service.Daydropdown = function() {
            var Daydropdown=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            return Daydropdown;
        }
        service.Timedropdown = function(){
              var hour = [];
             for (var i = 1; i <= 12; i++) {
                hour.push(i + ' ' + 'AM');
               }
                for (var k = 1; k <= 12; k++) {
               hour.push(k + ' ' + 'PM');
               }
               return hour;
        }
        return service;
    }
})();