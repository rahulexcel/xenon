(function() {
    'use strict';

    angular.module('xenon-app')
    .controller('paymentController', paymentController);
    function paymentController($scope, paymentFactory, localStorageService, Configurations, updateStoreInfoService) {
        console.log("Payment Page");
        var query = paymentFactory.get();
        query.$promise.then(function(data) {
            console.log(data);
        });
        var storeInfo = localStorageService.get('storeInfo');
        if(storeInfo.lcompleted.length == 4){
            $scope.stripeIsActivated = true;
            $scope.stripeIsActivatedMessage = true;
        }
        $(document).ready(function(){
            $("button").click(function(){
                $scope.$apply();
                $scope.activateStripeSpinner = true;
                var authWindow = window.open('about:blank', '_blank', 'left=20,top=20,width=800,height=800,toolbar=0,resizable=1');
                var userData = localStorageService.get('userData');
                var lid = userData.locations[0];
                var query = paymentFactory.authorize();
                query.$promise.then(function(data) {
                    console.log(data);
                    var api =  "https://protected-badlands-3499.herokuapp.com";
                    var socket = io(api);
                    socket.on('connect', function(){
                        console.log('connect');
                        authWindow.location = data.authorize_url + "?response_type=" + data.response_type + "&scope=" + data.scope + "&client_id=" + data.client_id + "&state=" + lid;
                  // authWindow.location.replace(data.authorize_url + "?response_type=" + data.response_type + "&scope=" + data.scope + "&client_id=" + data.client_id + "&state=" + lid);
                    // window.open(data.authorize_url + "?response_type=" + data.response_type + "&scope=" + data.scope + "&client_id=" + data.client_id + "&state=" + lid, '_blank','toolbar=0,location=0,directories=0,status=1,menubar=0,titlebar=0,scrollbars=1,resizable=1,width='+800+',height='+800);
                });
                    socket.on('message', function(msg) {
                        console.info(msg);
                        // authWindow = window.self;
                        // authWindow.opener = window.self;
                        // authWindow.close();
                        $scope.activateStripeSpinner = false;
                        $scope.stripeIsActivated = true;
                        $scope.stripeIsActivatedMessage = true;
                        updateStoreInfoService.updateStoreInfo();
                        // authWindow.close();
                        // authWindow.remove();
                 });
                    socket.emit('message', lid); 
                    $scope.activateStripeSpinner = false;               
                });
            });
        });
    }
    ;

})();