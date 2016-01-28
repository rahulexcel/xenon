(function() {
    'use strict';
    angular
        .module('xenon.controllers')
        .controller('ForgotPasswordCtrl', ForgotPasswordCtrl);

    function ForgotPasswordCtrl($scope, forgotFactory, $rootScope) {
        $scope.reset = function() {
            $scope.spinner = "true";
            var query = forgotFactory.save({
                email: $scope.email
            });
            query.$promise.then(function(data) {
                console.log(data);
                $scope.spinner=false;
             $scope.response=data.data;
            });
            $rootScope.isLoginPage = true;
            $rootScope.isLightLoginPage = true;
            $rootScope.isLockscreenPage = false;
            $rootScope.isMainPage = false;
        };
    }
})();