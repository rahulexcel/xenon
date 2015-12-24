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
        $log.log('Time changed to: ' + $scope.open);
    };
    $scope.closingtime = function() {
        $log.log('Time changed to: ' + $scope.close);
    };


var userData = localStorageService.get("userData");
console.log(userData.locations[0]);
var a=userData.locations[0];
console.log("userdata.location\n"+userData.locations);
edit();
function edit() {
        var query = storeinfoLocationsIdFactory.update({
            locationId: userData.locations[0]
        });
        query.$promise.then(function(data) {
            console.log(data);
        });

    }




    eid();

    function eid() {
        var userData = localStorageService.get("userData");
        var eid = userData.eid;
        console.log(eid);
        var query1 = storeinfoLocationsFactory.get({
            eid: eid
        });
        query1.$promise.then(function(data) {
            console.log(data);
        });

    }
    $scope.lsave = function() {
      console.log('open'+$scope.open);
       console.log('close'+$scope.close);
        $scope.ldesc = angular.element(document.querySelector('#uikit_editor_2')).val();
        var query = storeinfoLocationsIdFactory.update({
            locationId: userData.locations[0],
            lname: $scope.lname,
            ldesc: $scope.ldesc,
            lemail: $scope.lemail,
            llgo: $scope.llogo,
            laddr: $scope.laddr,
            lpostcode: $scope.lpostcode,
            lcity: $scope.city,
            lcountry: $scope.lcountry,
            lphone: $scope.lphone,
            llt: $scope.llt,
            lmessage: $scope.lmessage,
            lopentime: $scope.open,
            lclosetime: $scope.close
        });
        query.$promise.then(function(data) {
            console.log(data);

        });
    }


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