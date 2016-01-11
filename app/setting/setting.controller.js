(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('settingController', settingController);
    function settingController($scope, storeinfoLocationsIdFactory, localStorageService) {
        console.log("Setting Page");
        var userData = localStorageService.get("userData");
        var locationid = userData.locations[0];
        var query = storeinfoLocationsIdFactory.update({}, {
            'locationid': locationid
        });
        query.$promise.then(function(data) {
            console.log(data);
            $scope.countryName = data.data.lcountry;
            $scope.countryCurrency = data.data.lcurrency;
            $scope.tax = data.data.ltax;
            $scope.includeTax = data.data.ltaxall;
            $scope.transalation = data.data.lstorelang;
        });
        $scope.save = function() {
            $scope.spinner = true;
            console.log($scope.countryName + $scope.countryCurrency + $scope.tax + $scope.includeTax + $scope.transalation);
            var query = storeinfoLocationsIdFactory.update({}, {
                'locationid': locationid,
                'lcountry': $scope.countryName,
                'lcurrency': $scope.countryCurrency,
                'ltax': $scope.tax,
                'ltaxall': $scope.includeTax,
                'lstorelang': $scope.transalation
            });
            query.$promise.then(function(data) {
                console.log(data);
                $scope.spinner = false;
            });
        };
    };

})();