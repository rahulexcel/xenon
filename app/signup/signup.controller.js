angular.module('xenon.controllers').
	controller('signupCtrl', signupCtrl); 
		function signupCtrl($scope, $rootScope,Configurations, ajaxRequest )
	{   

		$scope.signup=function(){
			 var hash = CryptoJS.SHA256($scope.password);
			 var stringpassword= hash.toString(CryptoJS.enc.Hex);
				
			ajaxRequest.send('/reg', {
                        email: $scope.Email,
                        password: stringpassword
                    },
                    'POST')
                .then(function(response) {
        console.log(response);          
				  		});
            }
		 
		$rootScope.isLoginPage        = true;
		$rootScope.isLightLoginPage   = true;
		$rootScope.isLockscreenPage   = false;
		$rootScope.isMainPage         = false;
	}