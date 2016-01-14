(function() {
 'use strict';
 angular
  .module('xenon.controllers')
  .controller('storeinfoCtrl', storeinfoCtrl);

 function storeinfoCtrl($scope, $log, userValidate, countryData, FileUploader,uploadService, dropdownService, $state, storeinfoFactory, $timeout, calanderService, localStorageService, Upload, storeinfoLocationsFactory, storeinfoLocationsIdFactory, storeinfoLocFile) {
  console.log('Store info');
  userValidate.validUserController();
  var dateArray = [];
  var responseDateArr = [];
  var i;
  var LocationIdFlag = 0;
  var userData = localStorageService.get("userData");
  var locationId = userData.locations[0];
  var dayArr_for_schedule_view = [];
  var response_phone_no;
  var response_pic_name;
  var uploadResponseFileName;
  $scope.dropdown_days = dropdownService.Daydropdown();
  $scope.openingtime_hour = dropdownService.Timedropdown();
  $scope.closingtime_hour = dropdownService.Timedropdown();
  $scope.dropdown_country= dropdownService.countryDropdown();
  if (angular.isDefined(locationId)) {
   On_refresh();
  } else {
   LocationIdFlag = 1;
  }
  $scope.logInfos = function(event, date) {
   var ServiceDateArrayResponse = calanderService.getcalanderService(event, date, dateArray);
   console.log(ServiceDateArrayResponse);
  }

  function On_refresh() {
   $scope.spinner = true;
   var query = storeinfoLocationsIdFactory.get({}, {
    'locationid': userData.locations[0]
   });
   query.$promise.then(function(data) {
    console.log(data.lphone);
    localStorageService.set('storeInfo', data);
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
    $scope.llt = data.llt;
    $scope.lmessage = data.lmessage;
    $scope.highlightDays = data.ldateclosed;
    $scope.day_in_schedule_view = data.lwots;
    $scope.lclosed = data.lclosed;
    if ($scope.day_in_schedule_view.length == 0) {
     $scope.show_scheduled_table = false;
    } else {
     $scope.show_scheduled_table = true;
    }
    response_phone_no = data.lphone;
    console.log(data.lphone);
    if (angular.isDefined(data.llogo)) {
     $scope.picImage = 'http://s3.amazonaws.com/ordermagic/' + data.llogo;
    }
    response_pic_name = $scope.picImage;
    for (var i = 0; i < response_phone_no.length; i++) {
     if (response_phone_no[i] == '+') {
      var plus = i;
     }
     if (response_phone_no[i] == '-') {
      var dash = i;
     }
    }
    $scope.phone_code = response_phone_no.substring(plus, dash);
    if(response_phone_no.substring(dash + 1, response_phone_no.length)=='undefined'){
      $scope.phone_no="";
    }else{
     $scope.phone_no = response_phone_no.substring(dash + 1, response_phone_no.length);
   }
    dayArr_for_schedule_view = $scope.day_in_schedule_view;
    var closed = data.ldateclosed;
    dateArray = dateArray.concat(closed);
    for (i = 0; i < closed.length; i++) {
     var responseDate = closed[i].split('-').reverse();
     var responseTimestamp = new Date(responseDate).getTime();
     responseDateArr.push(responseTimestamp);
    }
    $scope.selectedDays = responseDateArr;
   });
  }
  var removed_day_array_from_dropdown = [];
  $scope.showOptions = function(row_from_dropdown) {
   var flag = 0;
   if (angular.isDefined($scope.day_in_schedule_view)) {
    for (var i = 0; i < $scope.day_in_schedule_view.length; i++) {
     if (row_from_dropdown == $scope.day_in_schedule_view[i].day) {
      removed_day_array_from_dropdown.push(row_from_dropdown);
      flag = 1;
     } else {}
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
  $scope.lsave = function(picImageurl) { 
   $scope.spinner = true;
   if ($scope.picImage == response_pic_name) {
    send_data_after_upload();
   } else {
    uploadService.send($scope.picImage, 'locfile')
                    .then(function(response) {
                      uploadResponseFileName=response.filename;
                      send_data_after_upload();
          console.log(response)
        });
   }
  }
  function send_data_after_upload() {
   console.log(uploadResponseFileName);
   var phoneNumber = $scope.phone_code + "-" + $scope.phone_no;
   if (LocationIdFlag === 0) {
    var query = storeinfoLocationsIdFactory.update({}, {
     'locationid': userData.locations[0],
     'lname': $scope.lname,
     'lwots': dayArr_for_schedule_view,
     'ldesc': $scope.ldesc,
     'lemail': $scope.lemail,
     'laddr': $scope.laddr,
     'llogo': uploadResponseFileName,
     'lpostcode': $scope.lpostcode,
     'lcity': $scope.lcity,
     'lstate': $scope.lstate,
     'lcountry': $scope.lcountry,
     'lphone': phoneNumber,
     'llt': $scope.llt,
     'ldateclosed': dateArray,
     'lmessage': $scope.lmessage,
     'lclosed': $scope.lclosed
    });
    query.$promise.then(function(data) {
     $scope.spinner = false;
     localStorageService.set('storeInfo', data);
     $state.go('dashboard.productList');
    });
   } else {
    var query = storeinfoFactory.save({
     'locationId': userData.locations[0],
     'lname': $scope.lname,
     'lwots': dayArr_for_schedule_view,
     'ldesc': $scope.ldesc,
     'lemail': $scope.lemail,
     'llogo': uploadResponseFileName,
     'laddr': $scope.laddr,
     'lpostcode': $scope.lpostcode,
     'lcity': $scope.lcity,
     'ldateclosed': dateArray,
     'lstate': $scope.lstate,
     'lcountry': $scope.lcountry,
     'lphone': phoneNumber,
     'llt': $scope.llt,
     'lmessage': $scope.lmessage,
     'lclosed': $scope.lclosed
    });
    query.$promise.then(function(data) {
     $scope.spinner = false;
     userData.locations = [data.data._id];
     localStorageService.set('userData', userData);
     $state.go('dashboard.productList');
    });
   }
  }
  $scope.tsave = function() {
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
   $scope.opening_selected_hour='';
   $scope.closing_selected_hour="";
   $scope.day='';
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
  $scope.country_selected = function() {
   for (var i = 0; i < countryData.length; i++) {
    if ($scope.lcountry == countryData[i].name.common) {
     $scope.phone_code = countryData[i].callingCode;
     console.log(countryData[i].callingCode);
    }
   }
  }
 }
})();
