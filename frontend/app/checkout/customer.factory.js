(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('putCustomer', putCustomer);

    function putCustomer($resource, Configurations, $localStorage, timeStorage, $rootScope) {

        console.log($localStorage.smstoken);
        return {
            update: function(token) {
                return $resource(Configurations.Hostserver + '/customer/:customerid', {
                    'customerid': '@customerid'
                }, {
                    'query': {
                        method: 'PUT',
                        params: {
                            //  'firstname': '@firstname',
                            //  'email': '@email',
                            // 'lastname': '@lastname',
                            //  'streetaddr':'@streetaddr',
                            //  'postcode': '@postcode'

                        },
                        headers: {'Authorization': 'Bearer ' + token}
                    }

                });
            }
        };

    }
    ;
})();


