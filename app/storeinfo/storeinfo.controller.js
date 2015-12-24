angular

.module('xenon.controllers')

.controller('storeinfoCtrl', storeinfoCtrl);

function storeinfoCtrl($scope, $log,  FileUploader, storeinfoFactory) {
  $scope.mytime = new Date();
  $scope.options = {

    hstep: [1, 2, 3],

    mstep: [1, 5, 10, 15, 25, 30]

  };
$scope.openingtime = function () {
    $log.log('Time changed to: ' + $scope.open);
  };

 
  
  $scope.closingtime = function () {
    $log.log('Time changed to: ' + $scope.close);
  };

  
  $scope.lsave=function(){
    //alert($scope.open);
   // alert($scope.close);
    $scope.ldesc = angular.element(document.querySelector('#uikit_editor_2')).val();
    var query = storeinfoFactory.save({lname: $scope.lname, ldesc: $scope.ldesc,lemail: $scope.lemail, llgo: $scope.llogo,laddr: $scope.laddr, lpostcode: $scope.lpostcode,lcity: $scope.city, lcountry: $scope.lcountry,lphone: $scope.lphone, llt: $scope.llt,lmessage: $scope.lmessage, lopentime:$scope.open, lclosetime:$scope.close});   
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