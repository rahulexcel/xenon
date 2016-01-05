(function() {
   'use strict';
   
       angular.module('xenon-app')
       .controller('paymentController', paymentController);
        function paymentController($scope, paymentFactory, localStorageService) {
       		console.log("Payment Page");
       		var query = paymentFactory.get();
            query.$promise.then(function(data) {
                        console.log(data);
                    });
            $scope.activateStripe = function(){
            	console.log('activateStripe');
              //window.open ("https://protected-badlands-3499.herokuapp.com/payments/authorize");
             var userData = localStorageService.get('userData');
             var lid = userData.locations[0];
       		var query = paymentFactory.authorize();
            query.$promise.then(function(data) {
                        console.log(data);
                        window.open (data.authorize_url+"?response_type="+data.response_type+"&scope="+data.scope+"&client_id="+data.client_id+"&state="+lid);
                    });
            };
};

})();