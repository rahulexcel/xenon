(function () {
    'use strict';

    angular.module('xenon-app')
            .controller('welcomeController', welcomeController);
    function welcomeController($scope, localStorageService, remainingStatusservice, storeinfoLocationsIdFactory, updateStoreInfoService) {
        console.log('welcome Controller');
        remainingStatusservice.remainingStatus();
        $scope.setupStoreInfo = true;
        $scope.setupStoreSetting = true;
        $scope.addFirstProduct = true;
        $scope.paymentDone = true;
        $scope.notCompleteFirstStep = true;
        $scope.showMainContent = true;
        $scope.welcomeSpinner = false;
//        $scope.storemessage = true;
//        $scope.settingmessage = true;
//        $scope.paymentmessage = true;
//        $scope.productmessage = true;
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
                query.$promise.then(function (data) {
                    console.log(data);
                    localStorageService.set('storeInfo', data);
                    console.log('data is saved in localstorage');
                    $scope.showMainContent = true;
                    $scope.welcomeSpinner = false;
                    console.log('first store info set');
                    $scope.setupStoreInfo = false;
                    $scope.notCompleteFirstStep = false;
//                    if (storeInfo.lcompleted.length != 1) {
//                        $scope.setupStoreSetting = false;
//                    }
//                    if (data.lcompleted.length > 2) {
//                        $scope.addFirstProduct = false;
//                    }
//                    if (storeInfo.lcompleted.length > 3) {
//                        $scope.paymentDone = false;
//                    }
                    remainingStatusservice.remainingStatus();

//                    for (var i = 0; i < storeInfo.lcompleted.length; i++) {
//                        if (storeInfo.lcompleted[i] === 1) {
//                            $scope.storemessage = false;
////                                $scope.settingmessage = true;
////                                $scope.paymentmessage = true;
////                                $scope.productmessage = true;
//
//                        }
//                        if (storeInfo.lcompleted[i] === 2) {
////                                $scope.storemessage = true;
//                            $scope.settingmessage = false;
////                                $scope.paymentmessage = true;
////                                $scope.productmessage = true;
//
//                        }
//                        if (storeInfo.lcompleted[i] === 3) {
////                                $scope.storemessage = false;
////                                $scope.settingmessage = true;
////                                $scope.paymentmessage = false;
//                            $scope.productmessage = false;
//
//                        }
//                        if (storeInfo.lcompleted[i] === 4) {
//                            //$scope.productmessage = false;
//                            $scope.paymentmessage = false;
//
//                        }
//                    }





                });

            }
        }
    }
    ;

})();
