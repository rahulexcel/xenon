(function () {
    'use strict';
    angular.module('xenon-app')
            .factory('remainingStatusservice', remainingStatusservice);
    function remainingStatusservice(localStorageService, storeinfoLocationsIdFactory, $rootScope) {
        var service = {};
        service.remainingStatus = function () {
            var storeInfo = localStorageService.get("storeInfo");
            console.log('remainingStatusservice');
            $rootScope.completed = true;

            if (angular.isDefined(storeInfo)) {
                var query = storeinfoLocationsIdFactory.get({}, {
                    'locationid': localStorageService.get("userData").locations[0]
                });
                query.$promise.then(function (data) {
                    localStorageService.set('storeInfo', data);
                    $rootScope.remainingstatus = 4 - data.lcompleted.length;

                    if ($rootScope.remainingstatus == 0) {
                        $rootScope.completed = false;
                    } else {
                        $rootScope.storemessage = true;
                        $rootScope.settingmessage = true;
                        $rootScope.paymentmessage = true;
                        $rootScope.productmessage = true;
                        for (var i = 0; i < data.lcompleted.length; i++) {
                            if (data.lcompleted[i] === 1) {
                                $rootScope.storemessage = false;
//                                $rootScope.settingmessage = true;
//                                $rootScope.paymentmessage = true;
//                                $rootScope.productmessage = true;

                            }
                            if (data.lcompleted[i] === 2) {
//                                $rootScope.storemessage = true;
                                $rootScope.settingmessage = false;
//                                $rootScope.paymentmessage = true;
//                                $rootScope.productmessage = true;

                            }
                            if (data.lcompleted[i] === 3) {
//                                $rootScope.storemessage = false;
//                                $rootScope.settingmessage = true;
//                                $rootScope.paymentmessage = false;
                                $rootScope.productmessage = false;

                            }
                            if (data.lcompleted[i] === 4) {
                                //$rootScope.productmessage = false;
                                $rootScope.paymentmessage = false;

                            }
//                          $rootScope.showMainContent = true;
//                    $rootScope.welcomeSpinner = false;
                        }

                    }

                });
            } else {
                $rootScope.storemessage = true;
                $rootScope.settingmessage = true;
                $rootScope.paymentmessage = true;
                $rootScope.productmessage = true;
                $rootScope.completed = true;
                $rootScope.remainingstatus = 4;
            }
        };


        return service;
    }
})();


