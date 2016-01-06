angular
    .module('xenon.controllers')
    .controller('storeinfoCtrl', storeinfoCtrl);

function storeinfoCtrl($scope, $log, FileUploader, storeinfoFactory, localStorageService, storeinfoLocationsFactory, storeinfoLocationsIdFactory,country) {

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
    if (angular.isDefined(locationId)) {
        edit();
    } else {
        LocationIdFlag = 1;
    }
    $scope.mytime = new Date();
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };
    $scope.openingtime = function() {
        openingTime = String($scope.open).substring(16, 21);

    };
    $scope.closingtime = function() {
        closingTime = String($scope.close).substring(16, 21);

    };
    $scope.logInfos = function(event, date) {
        event.preventDefault();
        var timeStamp = date.valueOf();
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
        console.log(DateFlag);
        if (DateFlag == 0) {
            console.log('unmatch');
            dateArray.push(fullDate);
        }
        console.log(dateArray);
        date.selected = !date.selected;
    }

    function edit() {
        $scope.spinner = true;
        var query = storeinfoLocationsIdFactory.update({}, {
            'locationid': userData.locations[0]
        });
        query.$promise.then(function(data) {
            localStorageService.set('storeInfo', data);
            console.log(data);
            $scope.spinner = false;
            $scope.lname = data.data.lname;
            angular.element(document.querySelector('.CodeMirror-code pre span')).text(data.data.ldesc);
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
            response_phone_no=data.data.lphone;
            console.log(response_phone_no);
            for(var i=0; i< response_phone_no.length; i++){
                if(response_phone_no[i]=='+'){
                    var plus=i;
                }
                if(response_phone_no[i]=='-'){
                    var dash=i;
                }
            }
            $scope.phone_code=response_phone_no.substring(plus, dash);
            $scope.phone_no=response_phone_no.substring(dash+1, response_phone_no.length);
            console.log($scope.phone_no);
            console.log(plus);
            console.log(dash);
            dayArr_for_schedule_view = $scope.day_in_schedule_view;
            console.log(dayArr_for_schedule_view);
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
            "Wdnesday",
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
    $scope.lsave = function(){
        var phoneNumber=$scope.phone_code+"-"+$scope.phone_no;
          $scope.ldesc = angular.element(document.querySelector('#uikit_editor_2')).val();
        $scope.spinner = true;
        if (LocationIdFlag === 0) {
            console.log("flag=o update is firing");
            var query = storeinfoLocationsIdFactory.update({}, {
                'locationid': userData.locations[0],
                'lname': $scope.lname,
                'lwots': dayArr_for_schedule_view,
                'ldesc': $scope.ldesc,
                'lemail': $scope.lemail,
                'llgo': $scope.llogo,
                'laddr': $scope.laddr,
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
            console.log("flag=1 save is firing");
          
            var query = storeinfoFactory.save({
                'locationId': userData.locations[0],
                'lname': $scope.lname,
                'lwots': dayArr_for_schedule_view,
                'ldesc': $scope.ldesc,
                'lemail': $scope.lemail,
                'llgo': $scope.llogo,
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
                console.log(data.data._id);
                userData.locations = [data.data._id];
                localStorageService.set('userData', userData);
            });
        }
    }
    $scope.tsave = function() {
        var day = $scope.day;
        var open = $scope.open;
        var close = $scope.close;
        var json;
        if ((angular.isDefined(openingTime)) && (angular.isDefined(closingTime))) {

        } else {
            if (angular.isDefined(openingTime)) {
                console.log(openingTime);
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
        console.log(JSON.stringify(dayArr_for_schedule_view));
        console.log(dayArr_for_schedule_view);
        $scope.day_in_schedule_view = dayArr_for_schedule_view;


    }
    $scope.removeTimes = function(index) {
        var idx = dayArr_for_schedule_view.indexOf(index);
        dayArr_for_schedule_view.splice(idx, 1);
        console.log(dayArr_for_schedule_view);
    }
    var cc=[];
     for(var i=0; i< country.length; i++){
        
        cc.push(country[i].code);
     }
      $scope.dropdown_code=cc;
    var uploader = $scope.uploader = new FileUploader({});
    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });
}