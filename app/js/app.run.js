(function() {
    'use strict';
    angular.module('xenon-app')
        .run(function(userValidate, $rootScope, $state) {
            userValidate.validUser1();

        })

})();