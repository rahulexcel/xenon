angular
    .module('xenon.controllers')
    .controller('storeinfoCtrl', storeinfoCtrl);

function storeinfoCtrl($scope, $log, FileUploader, storeinfoFactory, localStorageService, Upload, storeinfoLocationsFactory, storeinfoLocationsIdFactory, country, storeinfoLocFile) {

    var dateArray = [];
    var responseDateArr = [];
    var i;
    var DateFlag = 0;
    var LocationIdFlag = 0;
    var userData = localStorageService.get("userData");
    var locationId = userData.locations[0];
    var openingTime;
    var closingTime;
    var dayArr_for_schedule_view = [];
    var response_phone_no;
    var response_pic_name;
    var On_refresh_data;
    if (angular.isDefined(locationId)) {
        On_refresh();
    } else {
        LocationIdFlag = 1;
    }
   // var current_time=new Date();
   // var hours = new Date().getHours();
   // var minut=new Date().getMinutes();
// formatAMPM(date);
// function formatAMPM(date) {
//   var hours = date.getHours();
//   var minutes = date.getMinutes();
//   var ampm = hours >= 12 ? 'pm' : 'am';
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   minutes = minutes < 10 ? '0'+minutes : minutes;
//   var strTime = hours + ':' + minutes + ' ' + ampm;
//   console.log(strTime);
// }











    // $scope.mytime = new Date();
    // $scope.hstep = 1;
    // $scope.mstep = 15;
    // $scope.options = {
    //     hstep: [1, 2, 3],
    //     mstep: [1, 5, 10, 15, 25, 30]
    // };
    // $scope.openingtime = function() {
    //     openingTime = String($scope.open).substring(16, 21);

    // };
    // $scope.closingtime = function() {
    //     closingTime = String($scope.close).substring(16, 21);

    // };
    $scope.logInfos = function(event, date) {
        event.preventDefault();
        var timeStamp = date.valueOf();
       // var hours = new Date().getHours();
        //console.log(hours);
       // var minut = new Date().getMinutes();
        //console.log(minut);
        var day = new Date(timeStamp).getDate();
        var month = new Date(timeStamp).getMonth() + 1;
        var year = new Date(timeStamp).getFullYear();
        var fullDate = day + "-" + month + "-" + year;
        //console.log(dateArray);
        for (i = 0; i < dateArray.length; i++) {
            if (dateArray[i] === fullDate) {
                var idx = dateArray.indexOf(fullDate);
                dateArray.splice(idx, 1);
                DateFlag = 1;
            }
        }
        // console.log(DateFlag);
        if (DateFlag == 0) {
            // console.log('unmatch');
            dateArray.push(fullDate);
        }
        // console.log(dateArray);
        date.selected = !date.selected;
    }
   
    function On_refresh() {
        $scope.spinner = true;
        var query = storeinfoLocationsIdFactory.get({}, {
            'locationid': userData.locations[0]
        });
        query.$promise.then(function(data) {
            On_refresh_data = data;
            edit();
            localStorageService.set('storeInfo', data);

        });
    }

    function edit() {
        $scope.spinner = true;
       // console.log(On_refresh_data);
        var query = storeinfoLocationsIdFactory.update({}, {
            'locationid': userData.locations[0],
            'llt': On_refresh_data.llt,
            'lmessage': On_refresh_data.lmessage,
            'lphone': On_refresh_data.lphone,
            'lcity': On_refresh_data.lcity,
            'ldesc': On_refresh_data.ldesc,
            'lname': On_refresh_data.lname,
            'lpcats': On_refresh_data.lpcats,
            'ldateclosed': On_refresh_data.ldateclosed,
            'lwots': On_refresh_data.lwots
        });
        query.$promise.then(function(data) {
            localStorageService.set('storeInfo', data);
            $scope.spinner = false;
            $scope.lname = data.data.lname;
            $scope.ldesc = data.data.ldesc;
            $scope.lemail = data.data.lemail;
            $scope.llogo = data.data.llogo;
            $scope.laddr = data.data.laddr;
            $scope.lpostcode = data.data.lpostcode;
            $scope.lcity = data.data.lcity;
            $scope.lstate = data.data.lstate;
            $scope.lcountry = data.data.lcountry;
            $scope.lphone = data.data.lphone;
            $scope.llt = data.data.llt;
            $scope.lmessage = data.data.lmessage;
            $scope.highlightDays = data.data.ldateclosed;
            $scope.day_in_schedule_view = data.data.lwots;
            $scope.lclosed = data.data.lclosed;
            response_phone_no = data.data.lphone;
            $scope.picImage = 'http://s3.amazonaws.com/ordermagic/'+data.data.llogo;
            response_pic_name=$scope.picImage;
           //console.log($scope.picImage);
           console.log(data);
            for (var i = 0; i < response_phone_no.length; i++) {
                if (response_phone_no[i] == '+') {
                    var plus = i;
                }
                if (response_phone_no[i] == '-') {
                    var dash = i;
                }
            }
            $scope.phone_code = response_phone_no.substring(plus, dash);
            $scope.phone_no = response_phone_no.substring(dash + 1, response_phone_no.length);
            dayArr_for_schedule_view = $scope.day_in_schedule_view;
            var closed = data.data.ldateclosed;
            dateArray = dateArray.concat(closed);
            for (i = 0; i < closed.length; i++) {
                var responseDate = closed[i].split('-').reverse();
                var responseTimestamp = new Date(responseDate).getTime();
                responseDateArr.push(responseTimestamp);
            }
            $scope.selectedDays = responseDateArr;

        });
    }
    $scope.dropdown_days = {
        "'Architect'": [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ]
    };
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
    $scope.lsave = function() {
        //console.log($scope.picImage);
        if($scope.picImage==response_pic_name){
          send_data_after_upload();
        }else{
        upload($scope.picImage, 'https://protected-badlands-3499.herokuapp.com/locfile');
       // console.log(upload);
       }
    }

    function send_data_after_upload() {
       // console.log(uploadResponseFileName);
        var phoneNumber = $scope.phone_code + "-" + $scope.phone_no;
        $scope.spinner = true;
        if (LocationIdFlag === 0) {
           // console.log("flag=o update is firing");
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
            });
        } else {
            //console.log("flag=1 save is firing");
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
                //console.log(data.data._id);
                userData.locations = [data.data._id];
                localStorageService.set('userData', userData);
            });
        }
    }

    $scope.tsave = function() {
        //  console.log($scope.opening_selected_hour);
        // console.log($scope.opening_selected_minute);
        //  console.log($scope.opening_selected_division);
        //   console.log($scope.closing_selected_hour);
        //    console.log($scope.closing_selected_minute);
        //      console.log($scope.opening_selected_division);
        var day = $scope.day;
        var openingTime = $scope.opening_selected_hour + ":" + $scope.opening_selected_minute+" "+$scope.opening_selected_division;
        var closingTime = $scope.closing_selected_hour + ":" + $scope.closing_selected_minute+" "+$scope.closing_selected_division;
        var json;
        console.log(openingTime);
        console.log(closingTime);
        if ((angular.isDefined(openingTime)) && (angular.isDefined(closingTime))) {

        } else {
            if (angular.isDefined(openingTime)) {
                //  console.log(openingTime);
            } else {
                var ot = new Date();
                openingTime = String(ot).substring(16, 21);
            }
            if (angular.isDefined(closingTime)) {} else {
                var ct = new Date();
                closingTime = String(ct).substring(16, 21);
            }
        }

        json = {
            'day': day,
            'opening_time': openingTime,
            'closing_time': closingTime
        }
        dayArr_for_schedule_view.unshift(json);
        $scope.day_in_schedule_view = dayArr_for_schedule_view;


    }
    $scope.removeTimes = function(index) {
        var idx = dayArr_for_schedule_view.indexOf(index);
        dayArr_for_schedule_view.splice(idx, 1);

    }
    var countryCode = [];
    var countryName = [];
    for (var i = 0; i < country.length; i++) {
        countryCode.push(country[i].code);
        countryName.push(country[i].name);
    }
    $scope.dropdown_country = countryName;
    $scope.dropdown_code = countryCode;
    $scope.country_selected = function() {
        for (var i = 0; i < country.length; i++) {
            if ($scope.lcountry == country[i].name) {
                $scope.phone_code = country[i].code;
            }
        }
    }
    var uploadResponseFileName;
    function upload(file, url) {
        Upload.upload({
            url: url,
            data: {
                fileName: file
            }
        }).then(function(resp) {
           // console.log(resp);
            uploadResponseFileName = resp.data.filename;
            console.log(uploadResponseFileName);
            send_data_after_upload();

        }, function(resp) {
            //console.log('Error status: ' + resp.status);
        }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });

    };
       
    var hour=[];   
    for (var i = 1; i <= 12; i++) {
        hour.push(i);
    }
    $scope.openingtime_hour=hour;
    $scope.closingtime_hour=hour;
     var minute=[];   
    for (var i = 0; i <= 59; i++) {
        minute.push(i);
    }
    $scope.openingtime_minute=minute;
    $scope.closingtime_minute=minute;


}