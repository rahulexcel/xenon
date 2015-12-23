angular.module('xenon.controllers').
controller('LoginLightCtrl', LoginLightCtrl);
	function LoginLightCtrl($scope, $rootScope, ajaxRequest, loginFactory)
	{
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
                        console.log(data);
                        $scope.spinner = false;
                    });
            };
	}