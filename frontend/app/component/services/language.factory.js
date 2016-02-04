(function() {
    'use strict';
    angular.module('xenon-frontend')
        .factory('language', language);
    function language($localStorage, $translate) {
        var service = {};
        service.set = function(value) {
            console.log(value);
          var  countries={  
           "ES": "Spanish",
              "DE": "German",
              "FR": "French",
              "DK": "Danish",
              "FI": "Finnish",
              "NO": "Norwegian",
              "SE": "Swedish",
              "GB": "English"
             }
   var selected;   
for(var key in countries){
    if(value== key){
        var selected=key;
    }
}
console.log(countries[selected]);
console.log(selected);
 $translate.use(countries[selected]);
$localStorage['used']= countries[selected];
console.log(countries);
        }
       
        return service;
    }
})();


// (function() {
//     'use strict';
//     angular.module('xenon-frontend')
//         .run(function($rootScope, $state, $localStorage, $translate,$timeout, validate) {
//            validate.order_placed();
//             $rootScope.language = {
//             listIsOpen: false,
//             available: {
//                 'english': 'English',
//                 'french': 'French',
//                 'Danish': 'Danish',
//                 'Finnish':'Finnish',
//                 'Norwegian':'Norwegian',
//                 'German':'German',
//                 'Spanish':'Spanish',
//                 'Swedish':'Swedish'
//             },
//             init: function() {
//                 if (angular.isDefined($localStorage.used)) {
//                     $translate.use($localStorage.used);
//                     var proposedLanguage = $translate.proposedLanguage() || $translate.use($localStorage.used);
//                 }
//                 var proposedLanguage = $translate.proposedLanguage() || $translate.use(used);
//                 var preferredLanguage = $translate.preferredLanguage();
//                 $rootScope.language.selected = $rootScope.language.available[(proposedLanguage || preferredLanguage)];
//             },
//             set: function(localeId) {
//                 console.log(localeId);
//                 $localStorage.used = localeId;
//                 var used = localeId;
//                 $translate.use(used);
//             }
//         };
//         $rootScope.language.init();
           
          
//         })
// })();