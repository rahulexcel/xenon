(function() {
    'use strict';
    angular
        .module('xenon.controllers')
        .controller('signupCtrl', signupCtrl);

    function signupCtrl($scope, $rootScope, Configurations, signupFactory, $state, localStorageService) {

    $scope.signup = function() {
    
        $scope.spinner = "true";
       var query = signupFactory.save({email: $scope.email, password: $scope.password});
       query.$promise.then(function(data) {
                       if(data.success=="true");{
                       	$scope.info="Registration successfull";
                       	 $scope.spinner = false;
                         $scope.email = '';
                         $scope.password = '';
                            localStorageService.set('userData',{'userid': data.userid, 'eid': data.eid, 'locations': data.locations, 'token': data.token});
                        $state.go('dashboard.storeinfo');
 
                       }
                      
                   });
    };   

        $scope.goLogin = function() {
            $state.go('dashboard.login');
        }
        $rootScope.isLoginPage = true;
        $rootScope.isLightLoginPage = true;
        $rootScope.isLockscreenPage = false;
        $rootScope.isMainPage = false;
    }
})();
