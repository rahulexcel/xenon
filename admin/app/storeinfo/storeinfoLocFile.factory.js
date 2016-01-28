// (function() {
//     'use strict';
//     angular.module('xenon-app')
//         .factory('storeinfoLocFile', storeinfoLocFile);

//     function storeinfoLocFile($resource, Configurations) {
//         return $resource(Configurations.Hostserver + '/loc/:locationid', {
//         }, {
//             'get': {
//                 method: 'GET'
                
//             }
//         });
//     };
// })();

(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('storeinfoLocFile', storeinfoLocFile);

    function storeinfoLocFile($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/loc', {}, {});
    };
})();