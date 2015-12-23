
// (function() {
//    'use strict';
// angular.module('xenon-app')
//   .factory('myInterceptor', function ($q) {
//             var requestInterceptor = {
//                 request: function (config) {
                                        
//                         config.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
                    
//                     var deferred = $q.defer();

//                     config.transformRequest = function (obj) {
//                         var str = [];
//                         for (var p in obj)
//                             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//                         return str.join("&");
//                     };
//                     deferred.resolve(config);
//                     return deferred.promise;
//                 }
//             };
//             return requestInterceptor;
//         });
//   })();