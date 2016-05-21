(function() {
    'use strict';
    angular.module('xenon-app')
            .factory('fetchOrdersService', fetchOrdersService);
    function fetchOrdersService(ngAudio, orderListFactory, localStorageService, $rootScope, $interval) {
        var service = {};
        service.playSound = function() {
           var audio = ngAudio.load("app/audio/notify.wav");
           audio.unlock = true;
                audio.play();
            };
        service.playSoundInLoop = function(NoOfOrders) {
           var audio = ngAudio.load("app/audio/notify.wav");
           audio.unlock = true;
                audio.play();
                audio.loop = NoOfOrders-1;
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
                                            if(data[i].order_state == 2 || data[i].order_state == 1){
                                                newOrder++;
                                            }
                                        }
                                        if(newOrder > 1){
                                            service.playSoundInLoop(newOrder);
                                        } else if(newOrder > 0){
                                            service.playSound();
                                        }
                                        $rootScope.newOrder = newOrder;
                                    });

                        
                        $interval(function() {
                            var userData = localStorageService.get("userData");
                            if(userData){
                                var lid = userData.locations[0];
                                var query = orderListFactory.query({"storeId": lid});
                                    query.$promise.then(function(data) {
                                        // console.log(data);
                                        var newOrder=0;
                                        for(var i=0; i < data.length; i++){
                                            //console.log(data[i].order_state);
                                            if(data[i].order_state == 2 || data[i].order_state == 1){
                                                newOrder++;
                                            }
                                        }
                                        if(newOrder > 1){
                                            service.playSoundInLoop(newOrder);
                                        } else if(newOrder > 0){
                                            service.playSound();
                                        }
                                        $rootScope.newOrder = newOrder;
                                    });
                            }
                        }, 180000);      
                    }
                }
            };
        return service;
    }
})();