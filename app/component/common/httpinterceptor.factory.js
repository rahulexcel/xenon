 (function() {
   'use strict';
angular.module('xenon-app')
  .factory('myInterceptor', function (localStorageService) {
            var requestInterceptor = {
                request: function (config) {
                  var currentUser = localStorageService.get('userData');
              if (currentUser) {
                var accessToken = currentUser.token;
                config.headers['Authorization'] = 'Bearer ' + accessToken;
//                   config.headers = {
//                   'Content-Type': 'application/json',
//                   'Authorization': 'Bearer ' + accessToken
//                 };
               }
               return config;
                }
            };
            return requestInterceptor;
        });
  })();