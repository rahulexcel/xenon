
(function() {
   'use strict';
angular.module('xenon-app')
  .factory('myInterceptor', function (localStorageService) {
            var requestInterceptor = {
                request: function (config) {
                	var currentUser = localStorageService.get('userData');
       				var accessToken = currentUser.token;

        			if (accessToken) {
           				 config.headers = {
				           'Content-Type': 'application/json',
				           'Authorization': 'Bearer ' + accessToken
				         };
       				 }
       				 return config;
                }
            };
            return requestInterceptor;
        });
  })();
