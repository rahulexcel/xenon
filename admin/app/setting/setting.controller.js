(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('settingController', settingController);
    function settingController($scope, countryData, calanderService, remainingStatusservice, $state, arrayService, dropdownService, storeinfoLocationsIdFactory, localStorageService) {
        console.log("Setting Page");
        $scope.settingSpinner = true;
        $scope.showSettingContent = false;
        var userData = localStorageService.get("userData");
        var locationid = userData.locations[0];
        var dateArray = [];
        var responseDateArr = [];
        $scope.dropdown_days = dropdownService.Daydropdown();
        $scope.openingtime_hour = dropdownService.Timedropdown();
        $scope.closingtime_hour = dropdownService.Timedropdown();
        $scope.countryName = dropdownService.countryDropdown();
        $scope.llt = 10;
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
            $scope.settingSpinner = false;
            $scope.showSettingContent = true;
            console.log(data);
            $scope.selectedCountryName = data.lcountry;
            //console.log($scope.selectedCountryName);
            $scope.countryCurrency = data.lcurrency;
            $scope.tax = data.ltax;
            $scope.includeTax = data.ltaxall;
            $scope.transalation = data.lstorelang;
            if (data.ldeliverymode == 1) {
                $scope.deliveryModePic = true;
                $scope.deliveryModeDel = false;
            } else if (data.ldeliverymode == 2) {
                $scope.deliveryModePic = false;
                $scope.deliveryModeDel = true;
            } else if (data.ldeliverymode == 3) {
                $scope.deliveryModePic = true;
                $scope.deliveryModeDel = true;
            }
            $scope.deliveryPrice = data.ldeliveryprice;
            $scope.deliveryTax = data.ldeliverytax;
            //console.log(data.lcountry);
            $scope.selectedCountryName = data.lcountry;
            $scope.countryCurrency = data.lcurrency;
            $scope.day_in_schedule_view = data.lwots;
            $scope.llt = data.llt;
            $scope.lclosed = data.lclosed;
            dayArr_for_schedule_view = $scope.day_in_schedule_view;
            if ($scope.day_in_schedule_view.length == 0) {
                $scope.show_scheduled_table = false;
            } else {
                $scope.show_scheduled_table = true;
            }
            var closed = data.ldateclosed;
            dateArray = dateArray.concat(closed);
            for (var i = 0; i < closed.length; i++) {
                var responseDate = closed[i].split('-').reverse();
                //console.log(responseDate);
                var responseTimestamp = new Date(responseDate).getTime();
                responseDateArr.push(responseTimestamp);
                //console.log(responseTimestamp);
            }
            $scope.selectedDays = responseDateArr;
            //console.log($scope.selectedDays);
        });
        $scope.save = function() {
            if ($scope.deliveryPrice && !$scope.deliveryTax) {
                if ($scope.deliveryPrice && !$scope.deliveryTax) {
                    $scope.errorForTaxField = true;
                    $scope.errorday_in_schedule_view = false;
                }
            } else {
                if ($scope.day_in_schedule_view.length == 0) {
                    $scope.errorday_in_schedule_view = true;
                    $scope.errorForTaxField = false;
                } else {
                    $scope.errorForTaxField = false;
                    $scope.errorday_in_schedule_view = false;
                    $scope.spinner = true;
                    if ($scope.deliveryModeDel && $scope.deliveryModePic) {
                        $scope.deliveryMode = 3;
                    } else if ($scope.deliveryModeDel) {
                        $scope.deliveryMode = 2;
                    } else if ($scope.deliveryModePic) {
                        $scope.deliveryMode = 1;
                    } else {
                        $scope.deliveryMode = 1;
                    }
                    var query = storeinfoLocationsIdFactory.update({}, {
                        'locationid': locationid,
                        'ltax': $scope.tax,
                        'ltaxall': $scope.includeTax,
                        'lstorelang': $scope.transalation,
                        'ldateclosed': dateArray,
                        'ldeliverymode': $scope.deliveryMode,
                        'ldeliveryprice': $scope.deliveryPrice,
                        'ldeliverytax': $scope.deliveryTax,
                        'lwots': dayArr_for_schedule_view,
                        'llt': $scope.llt,
                        'lclosed': $scope.lclosed
                    });
                    query.$promise.then(function(data) {
                        console.log(data);
                        localStorageService.set('storeInfo', data.data);
                         remainingStatusservice. remainingStatus();
                        if (data.data.lcompleted.length < 3) {
                            $state.go('dashboard.welcome');
                        }

                        $scope.spinner = false;
                       
                       
                         $scope.lastupdated = arrayService.currenttime();


                    });
                }
            }
        };
        $scope.logInfos = function(event, date) {
            var ServiceDateArrayResponse = calanderService.getcalanderService(event, date, dateArray);
            console.log(ServiceDateArrayResponse);
        }
        var removed_day_array_from_dropdown = [];
        $scope.showOptions = function(row_from_dropdown) {
            var flag = 0;
            if (angular.isDefined($scope.day_in_schedule_view)) {
                for (var i = 0; i < $scope.day_in_schedule_view.length; i++) {
                    if (row_from_dropdown == $scope.day_in_schedule_view[i].day) {
                        removed_day_array_from_dropdown.push(row_from_dropdown);
                        flag = 1;
                    } else {
                    }
                }
            } else {
                return true;
            }
            if (flag == 0) {
                return true;
            } else {
                return false;
            }
        }
        var dayArr_for_schedule_view = [];
        $scope.tsave = function() {
            if ($scope.day && $scope.opening_selected_hour && $scope.closing_selected_hour) {
                $scope.errorForTaxField = false;
                $scope.errorday_in_schedule_view = false;
                $scope.show_scheduled_table = true;
                var day = $scope.day;
                var openingTime = $scope.opening_selected_hour;
                var closingTime = $scope.closing_selected_hour;
                var json;
                json = {
                    'day': day,
                    'opening_time': openingTime,
                    'closing_time': closingTime
                }
                dayArr_for_schedule_view.unshift(json);
                $scope.day_in_schedule_view = dayArr_for_schedule_view;
                $scope.opening_selected_hour = '';
                $scope.closing_selected_hour = "";
                $scope.day = '';
            }
        }
        $scope.removeTimes = function(index) {
            var idx = dayArr_for_schedule_view.indexOf(index);
            dayArr_for_schedule_view.splice(idx, 1);
            if ($scope.day_in_schedule_view.length == 0) {
                $scope.show_scheduled_table = false;
            } else {
                $scope.show_scheduled_table = true;
            }

        }
        $scope.checkStoreSetting = function() {
            // console.log('checkStoreSetting');
            var flag=0;
            if (localStorageService.get('storeInfo')) {
                var storeInfo = localStorageService.get('storeInfo');
                var lcompletedLength = storeInfo.lcompleted.length;
                for(var i=0; i<lcompletedLength; i++){
                    if(storeInfo.lcompleted[i]==4){
                        flag=1;
                    }
                }
                if (flag==0) {
                    $scope.checkStoreOpen = true;
                    $scope.lclosed = false;
                }
            } else {
                $scope.checkStoreOpen = true;
                $scope.lclosed = false;
            }
        }
    }
    ;

})();