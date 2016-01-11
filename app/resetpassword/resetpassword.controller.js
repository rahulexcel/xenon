(function() {
    'use strict';
    angular
        .module('xenon-app')
        .controller('ResetCtrl', ResetCtrl);
    function ResetCtrl($scope, forgotFactory) {
      console.log('Reset Controller');
    $scope.reset = function() {
        $scope.spinner = "true";
       var query = forgotFactory.save({email: $scope.email});
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