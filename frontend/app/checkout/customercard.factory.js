(function() {
    'use strict';
    angular.module('xenon-frontend')
        .factory('customercard', customercard);

    function customercard($resource, Configurations, $localStorage) {
        var currentUser = $localStorage.token;
        console.log(currentUser);
        //console.log(currentUser);
        //$httpProvider.interceptors.push('myInterceptor');
        //config.headers['Authorization'] = 'Bearer ' + currentUser;
        return $resource(Configurations.Hostserver + '/customercard/:customerid', {
            'customerid': '@customerid'
        }, {
            'update': {
                method: 'PUT',
                params: {
                    cvc: "@cvc",
                    exp_month: "@exp_month",
                    exp_year: "@exp_year",
                    number: "@number",
                    object: "@object"

                },
                headers: {
                    'Authorization': 'Bearer ' + currentUser
                }
            }

        });

    };
})();