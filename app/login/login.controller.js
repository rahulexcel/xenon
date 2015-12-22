angular.module('xenon.controllers').
controller('LoginLightCtrl', LoginLightCtrl);
	function LoginLightCtrl($scope, $rootScope)
	{

		
		
		$rootScope.isLoginPage        = true;
		$rootScope.isLightLoginPage   = true;
		$rootScope.isLockscreenPage   = false;
		$rootScope.isMainPage         = false;
	}