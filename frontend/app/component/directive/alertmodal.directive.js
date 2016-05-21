(function () {
    'use strict';
            angular.module('xenon-frontend')
            .directive('alert', function () {
                return {
                    restrict: 'E',
                    replace: true,
                    templateUrl: 'app/component/directive/alert.html',
                    scope:{
                        currency:'=',
                        limit: '='
                    }
                }
            });
})();