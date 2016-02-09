(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('plansController', plansController);
    function plansController($scope) {
        console.log('Plans Controller');
    };

})();