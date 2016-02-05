(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('settingController', settingController);
    function settingController($scope, countryData, dropdownService, storeinfoLocationsIdFactory, localStorageService) {
        console.log("Setting Page");
        var tz = jstz.determine();
        var timeZone = tz.name();
        var userData = localStorageService.get("userData");
        var locationid = userData.locations[0];
        $scope.countryName = dropdownService.countryDropdown();
        $scope.selectedCountry = function() {
            for (var i = 0; i < countryData.length; i++) {
                if ($scope.selectedCountryName == countryData[i].name.common) {
                    $scope.countryCurrency = countryData[i].currency;
                }
            }
        };
        var query = storeinfoLocationsIdFactory.get({}, {
            'locationid': locationid
        });
        query.$promise.then(function(data) {
            console.log(data);
            $scope.selectedCountryName = data.lcountry;
            console.log($scope.selectedCountryName);
            $scope.countryCurrency = data.lcurrency;
            $scope.tax = data.ltax;
            $scope.includeTax = data.ltaxall;
            $scope.transalation = data.lstorelang;
            $scope.deliveryMode = data.ldeliverymode;
            $scope.deliveryPrice = data.ldeliveryprice;
            $scope.deliveryTax = data.ldeliverytax;
        });
        $scope.save = function() {
            $scope.spinner = true;
            var query = storeinfoLocationsIdFactory.update({}, {
                'locationid': locationid,
                'lcountry': $scope.selectedCountryName,
                'lcurrency': $scope.countryCurrency,
                'ltax': $scope.tax,
                'ltaxall': $scope.includeTax,
                'lstorelang': $scope.transalation,
                'ldeliverymode': $scope.deliveryMode,
                'ldeliveryprice': $scope.deliveryPrice,
                'ldeliverytax': $scope.deliveryTax,
                'ltimezone': timeZone
            });
            query.$promise.then(function(data) {
                console.log(data);
                $scope.spinner = false;
            });
        };
    }
    ;

})();