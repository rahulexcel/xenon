
(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('customercard', customercard);

    function customercard($resource, Configurations, $localStorage, timeStorage, $rootScope) {


        return {
            update: function(token) {
                
                console.log(token);
                return $resource(Configurations.Hostserver + '/customercard/:customerid', {
                    'customerid': '@customerid'
                }, {
                    'query': {
                        method: 'PUT',
                        params: {
                            cvc: "@cvc",
                            exp_month: "@exp_month",
                            exp_year: "@exp_year",
                            number: "@number",
                            object: "@object"

                        },
                        headers: {'Authorization': 'Bearer ' + token}
                    }

                });
            }
        };

    }
    ;
})();


