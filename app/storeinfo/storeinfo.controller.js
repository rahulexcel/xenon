angular
    .module('xenon.controllers')
    .controller('storeinfoCtrl', storeinfoCtrl);

function storeinfoCtrl($scope, $log, FileUploader, storeinfoFactory, localStorageService, storeinfoLocationsFactory, storeinfoLocationsIdFactory) {
    $scope.mytime = new Date();
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };
    $scope.openingtime = function() {
        $log.log('open time ' + $scope.open);
    };
    $scope.closingtime = function() {
        $log.log('Time close ' + $scope.close);
    };


    var userData = localStorageService.get("userData");
    console.log("location id at o \n" + userData.locations[0]);
    var a = userData.locations[0];
    console.log("locations in local storage\n" + userData.locations);


    edit();

    function edit() {
        var query = storeinfoLocationsIdFactory.update({}, {
            'locationid': userData.locations[0],
            'lname': $scope.lname,
            'ldesc': $scope.ldesc,
            'lemail': $scope.lemail,
            'llgo': $scope.llogo,
            'laddr': $scope.laddr,
            'lpostcode': $scope.lpostcode,
            'lcity': $scope.city,
            'lcountry': $scope.lcountry,
            'lphone': $scope.lphone,
            'llt': $scope.llt,
            'lmessage': $scope.lmessage,
            'lopentime': $scope.open,
            'lclosetime': $scope.close
        });
        query.$promise.then(function(data) {
            console.log(data);
            $scope.lname = data.data.lname;       
            angular.element(document.querySelector('.CodeMirror-code pre span')).text(data.data.ldesc);
            $scope.lemail = data.data.lemail;
            $scope.llogo = data.data.llogo;
            $scope.laddr = data.data.laddr;
            $scope.lpostcode = data.data.lpostcode;
            $scope.city = data.data.city;
            $scope.lcountry = data.data.lcountry;
            $scope.lphone = data.data.lphone;
            $scope.llt = data.data.llt;
            $scope.lmessage = data.data.lmessage;
            $scope.open = data.data.lopentime;
            $scope.close = data.data.lclosetime;

        });

    }
    // eid();
    // function eid() {
    //     var userData = localStorageService.get("userData");
    //     var eid = userData.eid;
    //     console.log(eid);
    //     var query1 = storeinfoLocationsFactory.get({
    //         eid: eid
    //     });
    //     query1.$promise.then(function(data) {
    //         console.log(data);
    //     });

    // }

    $scope.lsave = function() {
      $scope.spinner=true;
        var query = storeinfoLocationsIdFactory.update({}, {
            'locationid': userData.locations[0],
            'lname': $scope.lname,
            'ldesc': $scope.ldesc,
            'lemail': $scope.lemail,
            'llgo': $scope.llogo,
            'laddr': $scope.laddr,
            'lpostcode': $scope.lpostcode,
            'lcity': $scope.city,
            'lcountry': $scope.lcountry,
            'lphone': $scope.lphone,
            'llt': $scope.llt,
            'lmessage': $scope.lmessage,
            'lopentime': $scope.open,
            'lclosetime': $scope.close
        });
        query.$promise.then(function(data) {
            $scope.spinner=false;
        });
    }




    // $scope.lsave = function() {
    //   console.log('open'+$scope.open);
    //    console.log('close'+$scope.close);
    //     $scope.ldesc = angular.element(document.querySelector('#uikit_editor_2')).val();
    //     var query = storeinfoFactory.save({
    //         locationId: userData.locations[0],
    //         lname: $scope.lname,
    //         ldesc: $scope.ldesc,
    //         lemail: $scope.lemail,
    //         llgo: $scope.llogo,
    //         laddr: $scope.laddr,
    //         lpostcode: $scope.lpostcode,
    //         lcity: $scope.city,
    //         lcountry: $scope.lcountry,
    //         lphone: $scope.lphone,
    //         llt: $scope.llt,
    //         lmessage: $scope.lmessage,
    //         lopentime: $scope.open,
    //         lclosetime: $scope.close
    //     });
    //     query.$promise.then(function(data) {
    //         console.log(data.data.lpostcode);
    //         edit();

    //     });
    // }


    var uploader = $scope.uploader = new FileUploader({

    });
    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }

    });

}