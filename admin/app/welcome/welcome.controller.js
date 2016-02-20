(function() {
    'use strict';

    angular.module('xenon-app')
    .controller('welcomeController', welcomeController);
    function welcomeController($scope, localStorageService, storeinfoLocationsIdFactory, updateStoreInfoService) {
        console.log('welcome Controller');
        $scope.setupStoreInfo = true;
        $scope.setupStoreSetting = true;
        $scope.addFirstProduct = true;
        $scope.paymentDone = true;
        $scope.notCompleteFirstStep = true;
        $scope.showMainContent = true;
        $scope.welcomeSpinner = false;
        var userData = localStorageService.get("userData");
        var storeInfo = localStorageService.get("storeInfo");
        if (angular.isDefined(userData)) {
        	if (userData.locations.length > 0) {
                $scope.showMainContent = false;
                $scope.welcomeSpinner = true;
                var userData = localStorageService.get("userData");
                var locationid = userData.locations[0];
                var query = storeinfoLocationsIdFactory.get({}, {
                    'locationid': locationid
                });
                query.$promise.then(function(data) {
                    console.log(data);
                    localStorageService.set('storeInfo', data);
                    console.log('data is saved in localstorage');
                    $scope.showMainContent = true;
                    $scope.welcomeSpinner = false;
                    console.log('first store info set');
                    $scope.setupStoreInfo = false;
                    $scope.notCompleteFirstStep = false;
                    if(storeInfo.lcompleted.length != 1){
                       $scope.setupStoreSetting = false;
                   } 
                   if(data.lcompleted.length > 2){
                    $scope.addFirstProduct = false;
                }
                if(storeInfo.lcompleted.length > 3){
                    $scope.paymentDone = false;
                }
            });
                
            }
        }
    };

})();
