(function() {
    'use strict';

    angular.module('xenon-app')
        .controller('paymentController', paymentController);

    function paymentController($scope, paymentFactory, $window, remainingStatusservice, localStorageService, Configurations, updateStoreInfoService) {
        var query = paymentFactory.get();
        query.$promise.then(function(data) {
            console.log(data);
        });
        var storeInfo = localStorageService.get('storeInfo');
        for (var i = 0; i < storeInfo.lcompleted.length; i++) {
            if (storeInfo.lcompleted[i] == 4) {
                // $scope.stripeIsActivated = true;
                // $scope.stripeIsActivatedMessage = true;
            }
        }
        $(document).ready(function() {
            $("button").click(function() {
                $scope.$apply();
                $scope.activateStripeSpinner = true;
                var authWindow = window.open('about:blank', '_blank', 'left=20,top=20,width=800,height=800,toolbar=0,resizable=1');
                var userData = localStorageService.get('userData');
                var lid = userData.locations[0];
                var query = paymentFactory.authorize();
                query.$promise.then(function(data) {
                    console.log(data);
                    var api = Configurations.Hostserver;
                    var socket = io(api);
                    socket.on('connect', function() {
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
                        //$window.close(authWindow)
                        $window.close('https://protected-badlands-3499.herokuapp.com/paymentcallback?state=5715fda60b5c691100884b79&scope=read_write&code=ac_8IXlTiDQUqxMjW8li1TO7IplvyifVBo8');
                       // authWindow.close();
                        // authWindow.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");
                        //alert(authWindow.parent.location);
                        authWindow.location.assign("www.w3schools.com")
                        //authWindow.close();
                        // authWindow.remove();
                    });
                    socket.emit('message', lid);
                    $scope.activateStripeSpinner = false;
                });
            });
        });
    };

})();