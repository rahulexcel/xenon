(function() {
   'use strict';

angular.module('xenon-app').
controller('LoginLightCtrl', LoginLightCtrl);
	function LoginLightCtrl($scope, $rootScope, ajaxRequest, loginFactory, localStorageService, $log, $state, storeinfoLocationsFactory)
	{
		$log.debug('Login Controller');
		$rootScope.navMenu = true;
		$rootScope.isLoginPage        = true;
		$rootScope.isLightLoginPage   = true;
		$rootScope.isLockscreenPage   = false;
		$rootScope.isMainPage         = false;
		$scope.login = function(){
			$scope.spinner = true;
			console.log($scope.email);
			 var hash = CryptoJS.SHA256($scope.password);
			 var stringpassword = hash.toString(CryptoJS.enc.Hex);
			var query = loginFactory.save({email: $scope.email, password: stringpassword});
			query.$promise.then(function(data) {
                        $scope.spinner = false;
                        localStorageService.set('userData',{'userid': data.userid, 'eid': data.eid, 'locations': data.locations, 'token': data.token});
                        
              //           var query1 = storeinfoLocationsFactory.get({
            		// 				'eid': data.eid
						        // });
						        // query1.$promise.then(function(data) {
						        //     console.log(data);
						        // });

                        $rootScope.userNavMenu = true;
                        $rootScope.navMenu = false;
                        $state.go('dashboard.storeinfo');
                    });
            };
	}
})();