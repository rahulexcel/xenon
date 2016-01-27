(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('putCustomer', putCustomer);

    function putCustomer($resource, Configurations, $localStorage) {
          var currentUser = $localStorage.token;
          console.log(currentUser);
         //$httpProvider.interceptors.push('myInterceptor');
           //config.headers['Authorization'] = 'Bearer ' + currentUser;
        return $resource(Configurations.Hostserver + '/customer/:customerid', {
                  'customerid':'@customerid'
        },{
            'update':{
                method:'PUT',
                params:{
                    
            },
            headers:{'Authorization':'Bearer ' + currentUser}
            }

        });

    };
})();




// (function() {
//     'use strict';
//     angular.module('xenon-frontend')
//             .factory('putCustomer', putCustomer);

//     function putCustomer($resource, Configurations, $localStorage) {
//           var currentUser = $localStorage.token;
//           console.log(currentUser);
//          //$httpProvider.interceptors.push('myInterceptor');
//            //config.headers['Authorization'] = 'Bearer ' + currentUser;
//         return $resource(Configurations.Hostserver + '/customer/:customerid', {
//                   'customerid':'@customerid'
//         },{
//             'update':{
//                 method:'PUT',
//                 params:{
                    
//             },
//             headers:{'Authorization':'Bearer ' + currentUser}
//             }

//         });

//     };
// })();



// (function() {
//    'use strict';
// angular.module('xenon-frontend')
// .config(function ($httpProvider) {
//     $httpProvider.interceptors.push('myInterceptor');
//     console.log($httpProvider.interceptors);
// });
// })();
//  (function() {
//    'use strict';
// angular.module('xenon-frontend')
//   .factory('myInterceptor', function ($localStorage) {
//             var requestInterceptor = {
//                 request: function (config) {
//                   console.log(config);
//                   var currentUser = $localStorage.token;
            
               
//                 config.headers['Authorization'] = 'Bearer ' + currentUser;
// //                   config.headers = {
// //                   'Content-Type': 'application/json',
// //                   'Authorization': 'Bearer ' + accessToken
// //                 };
              
//                return config;
//                 }
//             };
//             return requestInterceptor;
//         });
//   })();







// (function() {
//     'use strict';
//     angular.module('xenon-frontend')
//             .factory('putCustomer', putCustomer);

//     function putCustomer($resource, Configurations) {
//          //$httpProvider.interceptors.push('myInterceptor');
//         return $resource(Configurations.Hostserver + '/customer/:customerid', {
//                   'customerid':'@customerid'
//         },{
//             'update':{
//                 method:'PUT',
//                 params:{
                    
//             }
//             }

//         });

//     };
// })();



