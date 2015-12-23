(function() {
   'use strict';

angular.module('xenon-app').
controller('navbarController', navbarController);
	function navbarController($scope, $rootScope, ajaxRequest, loginFactory, localStorageService, $log, $state)
	{
		$log.debug('Navbar Controller');
		var userData = localStorageService.get('userData');
		if(userData){
			$rootScope.userNavMenu = true;
			$rootScope.navMenu = false;
		} else {
			$rootScope.userNavMenu = false;
			$rootScope.navMenu = true;
		}
		$scope.logout = function() {
			localStorageService.removeAll();
			$state.go('dashboard.login');
			$rootScope.userNavMenu = false;
			$rootScope.navMenu = true;
		};
		
	}
})();