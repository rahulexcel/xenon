(function() {
   'use strict';

angular
   .module('xenon.controllers')
   .controller('signupCtrl', signupCtrl);

function signupCtrl($scope, $rootScope, Configurations, signupFactory) {

    $scope.signup = function() {
        $scope.spinner = "true";
        var hash = CryptoJS.SHA256($scope.password);
        var stringpassword = hash.toString(CryptoJS.enc.Hex);

       var query = signupFactory.save({email: $scope.email, password: stringpassword});
       query.$promise.then(function(data) {
                       console.log(data);
                       $scope.spinner = false;
                   });
    }   

    $rootScope.isLoginPage = true;
    $rootScope.isLightLoginPage = true;
    $rootScope.isLockscreenPage = false;
    $rootScope.isMainPage = false;
}
})();