(function() {
    'use strict';
    angular
            .module('xenon.controllers')
            .controller('ResetPasswordCtrl', ResetPasswordCtrl);
    function ResetPasswordCtrl($scope, resetFactory,$stateParams, $rootScope) {
        console.log($stateParams);
        $scope.reset = function() {
            $scope.spinner = "true";
            var query = resetFactory.save({
                token: $stateParams.token,
                password: $scope.password
            });
            query.$promise.then(function(data) {
                console.log(data);
                $scope.spinner = false;
                $scope.response = data.data;
            });
            $rootScope.isLoginPage = true;
            $rootScope.isLightLoginPage = true;
            $rootScope.isLockscreenPage = false;
            $rootScope.isMainPage = false;
        };
    }
})();