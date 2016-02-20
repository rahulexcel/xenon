(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('plansController', plansController);
    function plansController($scope, localStorageService, $timeout, $localStorage, proPlanFactory, basicPlanFactory, updateStoreInfoService) {
        console.log('Plans Controller');
        var storeInfo = localStorageService.get("storeInfo");
        if(storeInfo){
        	if(storeInfo.lplan){
        		$scope.plan = storeInfo.lplan;
        	}
        }
       $scope.changePlan = function(currentPlanValue){
        $scope.planChangeSpinner = true;
       		if($scope.plan == currentPlanValue){
       			$scope.currentPlanAlert = true;
       			 $timeout(function() {
       			 	$scope.currentPlanAlert = false;
				    }, 1000);
       		} else{
       			console.log(currentPlanValue);
              if(currentPlanValue == 1){
                if(confirm("going from pro to pay as you go")){
                  console.log('yes');
                  console.log('change to basic plan');
                changePlanToBasicApi();
                }
                
              }
              if(currentPlanValue == 2){
                console.log('change to pro plan');
                proPlanCheckout();
              }
       		}
       }
       function changePlanToProApi(stripeData){
          var query = proPlanFactory.save({
                "stripeToken": stripeData.id
            });
            query.$promise.then(function(data) {
                console.log(data);
                updateStoreInfoService.updateStoreInfo();
                $scope.plan = data.plan_type;
                $scope.planChangeSpinner = false;
            }); 
       }
       function changePlanToBasicApi(){
          var query = basicPlanFactory.save({});
            query.$promise.then(function(data) {
                console.log(data);
                updateStoreInfoService.updateStoreInfo();
                $scope.plan = data.plan_type;
                $scope.planChangeSpinner = false;
            }); 
       }
       function proPlanCheckout(){
          var handler = StripeCheckout.configure({
                  key: 'pk_test_s9jIizZdUfhjMplDPtyMFAN7',
                  locale: 'auto',
                  token: function(response) {
                      console.log(response);
                      changePlanToProApi(response);
                  }
              });
                // Open Checkout with further options
                handler.open({
                    name: 'store name',
                    description: 'changing plan',
                    amount: 3900,//39$
                    // currency: $localStorage.storeInfo.lcurrency,
                    locale: 'auto',
                    image: 'app/assets/images/logo.png',
                    // email: 'test@gmail.com',
                    allowRememberMe: 'false'
                });
              $(window).on('popstate', function() {
                  handler.close();
              });
       }
    };

})();