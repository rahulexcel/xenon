(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('plansController', plansController);
    function plansController($scope, localStorageService, $timeout, $localStorage, proPlanFactory, basicPlanFactory, updateStoreInfoService) {
        console.log('Plans Controller');
         $scope.showModal = false;
        var storeInfo = localStorageService.get("storeInfo");
        console.log(storeInfo);
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
                   $scope.showModal = !$scope.showModal;
//                if(confirm("going from pro to pay as you go")){
//                  console.log('yes');
//                  console.log('change to basic plan');
//                changePlanToBasicApi();
//                }
                
              }
              if(currentPlanValue == 2){
                console.log('change to pro plan');
                proPlanCheckout();
              }
       		}
       }
       $scope.yes=function(){
           changePlanToBasicApi();
           $scope.spinneryes=true;
       }
       $scope.no=function(){
            $scope.showModal=false;
            $scope.spinneryes=false;
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
                $scope.showModal=false;
            }); 
       }
//        $scope.showModal = false;
//    $scope.toggleModal = function(){
//        $scope.showModal = !$scope.showModal;
//    };
       function proPlanCheckout(){
          var handler = StripeCheckout.configure({
                  key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh'   ,
                  locale: 'auto',
                  token: function(response) {
                      console.log(response);
                      changePlanToProApi(response);
                  }
              });
                // Open Checkout with further options
                handler.open({
                    name: storeInfo.lname,
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