(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('welcomeController', welcomeController);
    function welcomeController($scope, localStorageService, storeinfoLocationsIdFactory) {
        console.log('welcome Controller');
        $scope.setupStoreInfo = true;
        $scope.setupStoreSetting = true;
        $scope.addFirstProduct = true;
        $scope.paymentDone = true;
        var userData = localStorageService.get("userData");
        var storeInfo = localStorageService.get("storeInfo");
        if (angular.isDefined(userData)) {
        	if (userData.locations.length > 0) {
        		console.log('first store info set');
        		$scope.setupStoreInfo = false;
        		if(storeInfo.lcompleted.length != 1){
        			$scope.setupStoreSetting = false;
                    var query = storeinfoLocationsIdFactory.get({}, {
                        'locationid': userData.locations[0]
                    });
                    query.$promise.then(function(data) {
                        localStorageService.set("storeInfo", data);
                    });
        		} 
                if(storeInfo.lcompleted.length > 2){
                    $scope.addFirstProduct = false;
                }
                if(storeInfo.lcompleted.length > 3){
                    $scope.paymentDone = false;
                }
        	}
        }
    };

})();
