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
                    //     cvc: "@cvc",
                    // exp_month: "@exp_month",
                    // exp_year: "@exp_year",
                    // number: "@number",
                    // object: "@object"
                    
            },

            headers:{'Authorization':'Bearer ' + token}
            }

        });
      }
    };
      
    };
})();


