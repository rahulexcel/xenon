(function() {
   'use strict';
   
       angular.module('xenon-app')
       .controller('addProductController', addProductController);
        function addProductController($scope, addProductFactory, Upload, localStorageService, $rootScope, productListFactory, productFactory, $state, imageUploadFactory) {
       		console.log("Add Product Page");
          if($rootScope.editProductId){
            console.log('Edit Product Id: '+$rootScope.editProductId);
            $scope.editThisProduct = true;
            $scope.saveProduct = false;
            var query = productListFactory.singleProduct({"productId": $rootScope.editProductId});
            query.$promise.then(function(data) {
                        console.log(data);
                        $scope.productName = data.pname;
                        angular.element(document.querySelector('.CodeMirror-code pre span')).text(data.pdesc);
                        $scope.productPrice = data.price;
                        $scope.productQuantity = data.pinv;
                    });
          } else {
            $scope.editThisProduct = false;
            $scope.saveProduct = true;
          }
          $scope.infinite = function(){
            $scope.productQuantity = -1;
          };
          $scope.editProduct = function(editProductId){
            $scope.spinner = true;
            console.log(editProductId);
            $scope.productDescription = angular.element(document.querySelector('.CodeMirror-code pre span')).text();
            var userData = localStorageService.get('userData');
            var lid = userData.locations[0];
            if(!$scope.productQuantity){
              $scope.productQuantity = -1;
            }
            var query = productFactory.editProduct({
              "prodId":editProductId,
              "pname": $scope.productName,
              "pdesc":$scope.productDescription,
              "price":$scope.productPrice,
              "pinv":$scope.productQuantity,
              "pinvdaily":false,
              "pcal":false,
              "pimages":["353473874.jpg"],
              "pfeatures":false,
              "lid": lid
            });
      query.$promise.then(function(data) {
                        console.log(data);
                        $state.go('dashboard.productList');
                    });
          };


       		$scope.addProduct = function(){
            $scope.spinner = true;
        var query = imageUploadFactory.get({});
                    query.$promise.then(function(data) {
                        console.log(data);
                        $scope.productDescription = angular.element(document.querySelector('#uikit_editor_2')).val();
            var userData = localStorageService.get('userData');
            var lid = userData.locations[0];
            if(!$scope.productQuantity){
              $scope.productQuantity = -1;
            }

            var query = addProductFactory.save({
              "pname": $scope.productName,
              "pdesc":$scope.productDescription,
              "price":$scope.productPrice,
              "pinv":$scope.productQuantity,
              "pinvdaily":false,
              "pcal":false,
              "pimages":[data.filename],
              "pfeatures":false,
              "lid": lid
            });
      query.$promise.then(function(data) {
                        console.log(data);
                        $scope.spinner = false;
                        $scope.productName = '';
                        $scope.productPrice = '';
                        $scope.productQuantity= '';
                        angular.element(document.querySelector('.CodeMirror-code pre span')).text(' ');
                    });
                        // upload_file($scope.picImage, data.signed_request, data.url);
                    });
       		};
          $scope.back = function(){
            $state.go('dashboard.productList');
          };
           // upload on file select or drop
    //  function upload (file, url) {
    //     Upload.upload({
    //         url: url,
    //         data: {file: file}
    //     }).then(function (resp) {
    //         console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    //     }, function (resp) {
    //         console.log('Error status: ' + resp.status);
    //     }, function (evt) {
    //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //     });
    // };

//     function upload_file(file, signed_request, url){
//     var xhr = new XMLHttpRequest();
//     xhr.open("PUT", signed_request);
//     xhr.setRequestHeader('x-amz-acl', 'public-read');
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             document.getElementById("preview").src = url;
//             document.getElementById("avatar_url").value = url;
//         }
//     };
//     xhr.onerror = function() {
//         alert("Could not upload file.");
//     };
//     xhr.send(file);
// };







};

})();