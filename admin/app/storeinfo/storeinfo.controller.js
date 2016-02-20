(function() {
    'use strict';
    angular
            .module('xenon.controllers')
            .controller('storeinfoCtrl', storeinfoCtrl);
    function storeinfoCtrl($scope, $log, countryData, $rootScope, fetchOrdersService, $modal, FileUploader, arrayService, uploadService, dropdownService, $state, storeinfoFactory, $timeout, calanderService, localStorageService, Upload, storeinfoLocationsFactory, storeinfoLocationsIdFactory, storeinfoLocFile) {
        fetchOrdersService.newOrders();
        var tz = jstz.determine();
        var timeZone = tz.name();
        var i;
        var LocationIdFlag = 0;
        var userData = localStorageService.get("userData");
        var locationId = userData.locations[0];
        var response_phone_no;
        var response_pic_name;
        var uploadResponseFileName;
        $scope.dropdown_country = dropdownService.countryDropdown();
        if (angular.isDefined(locationId)) {
            On_refresh();
        } else {
            LocationIdFlag = 1;
        }
        function On_refresh() {
            $scope.spinner = true;
            var query = storeinfoLocationsIdFactory.get({}, {
                'locationid': userData.locations[0]
            });
            query.$promise.then(function(data) {
                // console.log(data);
                $scope.showMyStoreNav = true;
                $scope.ldomain = data.ldomain;
                localStorageService.set('storeInfo', data);
                $scope.spinner = false;
                $scope.lname = data.lname;
                $scope.ldesc = data.ldesc;
                $scope.lemail = data.lemail;
                $scope.llogo = data.llogo;
                $scope.laddr = data.laddr;
                $scope.lpostcode = data.lpostcode;
                $scope.lcity = data.lcity;
                $scope.lstate = data.lstate;
                $scope.lcountry = data.lcountry;
                $scope.lmessage = data.lmessage;
                $scope.highlightDays = data.ldateclosed;
                response_phone_no = data.lphone;
                //console.log(data.lphone);
                if (angular.isDefined(data.llogo)) {
                    $scope.picImage = 'http://s3.amazonaws.com/ordermagic/' + data.llogo;
                }
                response_pic_name = $scope.picImage;
                $scope.phone_code = data.lcountrycode;
                $scope.phone_no = data.lphone;
                $rootScope.showMyStoreNav = false;
                $rootScope.ldomain = data.ldomain;
            });
        }
        $scope.lsave = function(picImageurl) {
            $scope.spinner = true;
            if ($scope.picImage == response_pic_name) {
                send_data_after_upload();
            } else {
                uploadService.send($scope.picImage, 'locfile')
                        .then(function(response) {
                            uploadResponseFileName = response.filename;
                            send_data_after_upload();
                            console.log(response)
                        });
            }
        }
        function send_data_after_upload() {
            if (LocationIdFlag === 0) {
                var query = storeinfoLocationsIdFactory.update({}, {
                    'locationid': userData.locations[0],
                    'lname': $scope.lname,
                    'ldesc': $scope.ldesc,
                    'lemail': $scope.lemail,
                    'laddr': $scope.laddr,
                    'llogo': uploadResponseFileName,
                    'lpostcode': $scope.lpostcode,
                    'lcity': $scope.lcity,
                    'lstate': $scope.lstate,
                    'lcountry': $scope.lcountry,
                    'lcountrycode': $scope.phone_code[0],
                    'lphone': $scope.phone_no,
                    'lmessage': $scope.lmessage,
                    'ltimezone': timeZone,
                    'lcurrency': $scope.countryCurrency
                });
                query.$promise.then(function(data) {
                    $scope.spinner = false;
                    localStorageService.set('storeInfo', data.data);
                    $state.go('dashboard.productList');
                });
            } else {
                var query = storeinfoFactory.save({
                    'locationId': userData.locations[0],
                    'lname': $scope.lname,
                    'ldesc': $scope.ldesc,
                    'lemail': $scope.lemail,
                    'llogo': uploadResponseFileName,
                    'laddr': $scope.laddr,
                    'lpostcode': $scope.lpostcode,
                    'lcity': $scope.lcity,
                    'lstate': $scope.lstate,
                    'lcountrycode': $scope.phone_code[0],
                    'lcountry': $scope.lcountry,
                    'lphone': $scope.phone_no,
                    'lmessage': $scope.lmessage,
                    'ltimezone': timeZone,
                    'lcurrency': $scope.countryCurrency
                });
                query.$promise.then(function(data) {
                    $scope.spinner = false;
                    userData.locations = [data.data._id];
                    localStorageService.set('userData', userData);
                    localStorageService.set('storeInfo', data.data);
                    
	                $rootScope.showMyStoreNav = false;
	                $rootScope.ldomain = data.ldomain;
	                $state.go('dashboard.welcome');
                    // $state.go('dashboard.productList');
                });
            }
        }
        $scope.country_selected = function() {
            for (var i = 0; i < countryData.length; i++) {
                if ($scope.lcountry == countryData[i].name.common) {
                    $scope.phone_code = countryData[i].callingCode;
                    $scope.countryCurrency = countryData[i].currency;
                    console.log(countryData[i].callingCode);
                    console.log($scope.countryCurrency);
                }
            }
        }
    }
})();
