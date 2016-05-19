(function() {
    'use strict';
    angular.module('xenon-app').
            controller('LoginLightCtrl', LoginLightCtrl);
    function LoginLightCtrl($scope, $rootScope, ajaxRequest, loginFactory, storeinfoLocationsIdFactory, localStorageService, $log, $state, storeinfoLocationsFactory, userValidate)
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
               
                // console.log(data.data);
                if (data.data == 'Incorrect email/password') {
                    $scope.error = 'Incorrect email/password';
                     $scope.spinner = false;
                } else {
                    localStorageService.set('userData', {'userid': data.userid, 'eid': data.eid, 'locations': data.locations, 'token': data.token});
                    console.log(data);
                    if(data.locations.length > 0){
                        console.log('fire api');
                            var query = storeinfoLocationsIdFactory.get({}, {
                            'locationid': data.locations[0]
                        });
                        query.$promise.then(function(data) {
                             $scope.spinner = false;
                             $rootScope.userNavMenu = true;
                        $rootScope.navMenu = false;
                            console.log(data);
                            localStorageService.set('storeInfo', data);
                            console.log('data is saved in localstorage');
                            if(data.lcompleted.length < 4){
                                $state.go('dashboard.welcome');

                            } else{
                                $state.go('dashboard.productOrders');
                            }
                        });
                    } else{
                        $state.go('dashboard.welcome');
                        $rootScope.userNavMenu = true;
                        $rootScope.navMenu = false;
                    }
                    // $rootScope.userNavMenu = true;
                    // $rootScope.navMenu = false;
                    // $state.go('dashboard.storeinfo');
                }
            });
        };
    }
})();