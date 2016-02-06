(function() {
    'use strict';
    angular.module('xenon-app')
            .factory('arrayService', arrayService);
    function arrayService(currencySymbol) {
        var service = {};
        service.CurrencySymbol = function(data) {
           //console.log(data);
            var flag = 0;
            var symbol;
            for (var i = 0; i < currencySymbol.length; i++) {
                if (currencySymbol[i].cc == data.toLowerCase()||currencySymbol[i].cc == data.toUpperCase()) {
                    symbol = currencySymbol[i].symbol;
                    flag=1;
                }
            }
            if(flag==0){
               // console.log(data);
                return data;
            }else{
                //console.log(symbol);
                return symbol;
            }
        }
     

        return service;
    }
})();