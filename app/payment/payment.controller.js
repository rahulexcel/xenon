(function() {
   'use strict';
   
       angular.module('xenon-app')
       .controller('paymentController', paymentController);
        function paymentController($scope, paymentFactory) {
       		console.log("Payment Page");
       		var query = paymentFactory.get();
            query.$promise.then(function(data) {
                        console.log(data);
                    });
            $scope.activateStripe = function(){
            	console.log('activateStripe');
       		var query = paymentFactory.authorize();
            query.$promise.then(function(data) {
                        console.log(data);
                    });
            };
};

})();