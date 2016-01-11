(function() {
    'use strict';
    angular.module('xenon-app').
            controller('LoginLightCtrl', LoginLightCtrl);
    function LoginLightCtrl($scope, $rootScope, ajaxRequest, loginFactory, localStorageService, $log, $state, storeinfoLocationsFactory, userValidate)
    {
        $log.debug('Login Controller');
        var userData = localStorageService.get('userData');
        if (userData) {
            $state.go('dashboard.storeinfo');
        } else {
        }
        $scope.login = function() {
            $scope.spinner = true;
            console.log($scope.email);
            var hash = CryptoJS.SHA256($scope.password);
            var stringpassword = hash.toString(CryptoJS.enc.Hex);
            var query = loginFactory.save({email: $scope.email, password: stringpassword});
            query.$promise.then(function(data) {
                $scope.spinner = false;
                console.log(data.data);
                if (data.data == 'Incorrect email/password') {
                    $scope.error = 'Incorrect email/password';
                } else {
                    localStorageService.set('userData', {'userid': data.userid, 'eid': data.eid, 'locations': data.locations, 'token': data.token});
                    $rootScope.userNavMenu = true;
                    $rootScope.navMenu = false;
                    $state.go('dashboard.storeinfo');
                }
            });
        };
    }
})();