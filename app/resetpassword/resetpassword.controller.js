(function() {
    'use strict';
    angular
        .module('xenon.controllers')
        .controller('ResetPasswordCtrl', ResetPasswordCtrl);
    function ResetPasswordCtrl($scope, resetFactory, $rootScope) {
        console.log('Reset Controller');
        $scope.reset = function() {
            $scope.spinner = "true";
            var query = resetFactory.save({
                token:'87e56afaaa585553bdfaee1563c50a66b423d0f5',
                password:$scope.password
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