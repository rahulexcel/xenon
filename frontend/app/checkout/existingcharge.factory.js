// (function() {
//     'use strict';
//     angular.module('xenon-frontend')
//             .factory('existingcharge', existingcharge);

//     function existingcharge($resource, Configurations) {
//         return $resource(Configurations.Hostserver + '/existingcharge', {}, {});
//     }
//     ;
// })();

(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('existingcharge', existingcharge);

    function existingcharge($resource, Configurations, $localStorage, timeStorage, $rootScope) {           
    return {
    update: function (token) {
        return $resource(Configurations.Hostserver + '/existingcharge', {
        },{ 
            'query':{
                method:'POST',
                params:{
                    // 'customerid':"@customerid",
                    //  'orderid':"@orderid"    
            },
            headers:{'Authorization':'Bearer ' + token}
            }

        });
      }
    };
      
    };
})();


