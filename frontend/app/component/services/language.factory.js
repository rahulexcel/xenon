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
$localStorage['keyOfused']=selected;
console.log(countries);
        }
       
        return service;
    }
})();