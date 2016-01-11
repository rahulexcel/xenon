(function() {
    'use strict';
    angular
        .module('xenon.controllers')
        .controller('ResetCtrl', ResetCtrl);

    function ResetCtrl($scope, forgotFactory, $rootScope) {
        $scope.reset = function() {
            $scope.spinner = "true";
            var query = forgotFactory.save({
                email: $scope.email
            });
            query.$promise.then(function(data) {
                console.log(data);

            });
            $rootScope.isLoginPage = true;
            $rootScope.isLightLoginPage = true;
            $rootScope.isLockscreenPage = false;
            $rootScope.isMainPage = false;
        };
    }
})();