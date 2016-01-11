(function() {
    'use strict';
    angular
        .module('xenon.controllers')
        .controller('ResetPasswordCtrl', ResetPasswordCtrl);
    function ResetPasswordCtrl($scope, resetFactory, $rootScope) {
        $scope.reset = function() {
            $scope.spinner = "true";
            var query = resetFactory.save({
                token: 'e392f411c7bab60848b6dc5fbebf08184ece5780',
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