(function() {
    'use strict';
    angular.module('xenon-app')
            .factory('fetchOrdersService', fetchOrdersService);
    function fetchOrdersService(ngAudio, orderListFactory, localStorageService, $rootScope) {
        var service = {};
        service.playSound = function(data) {
           var audio = ngAudio.load("app/audio/song1.mp3");
                audio.play();
            };
        service.newOrders = function() {
            var userData = localStorageService.get("userData");
                if (angular.isDefined(userData)) {
                    if(userData.locations.length != 0){
                        var lid = userData.locations[0];
                        var query = orderListFactory.query({"storeId": lid});
                        query.$promise.then(function(data) {
                            // console.log(data);
                            var newOrder=0;
                            for(var i=0; i < data.length; i++){
                                //console.log(data[i].order_state);
                                if(data[i].order_state == 2){
                                    newOrder++;
                                }
                            }
                            if(newOrder > 0){
                                service.playSound();
                            }
                            $rootScope.newOrder = newOrder;
                        });
                    }
                }
            };
        return service;
    }
})();