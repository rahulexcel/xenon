(function() {
   'use strict';
   
       angular.module('xenon-app')
       .controller('addProductController', addProductController);
        function addProductController($scope, addProductFactory, Upload, localStorageService, $rootScope, productListFactory, productFactory, $state, imageUploadFactory) {
       		console.log("Add Product Page");
          if($rootScope.editProductId){
            $scope.formSpinner = true;
            $scope.editForm = false;
            console.log('Edit Product Id: '+$rootScope.editProductId);
            $scope.editThisProduct = true;
            $scope.saveProduct = false;
            var query = productListFactory.singleProduct({"productId": $rootScope.editProductId});
            query.$promise.then(function(data) {
                        console.log(data);
                        $scope.productName = data.pname;
                        $scope.productDescription = data.pdesc;
                        $scope.productPrice = data.price;
                        $scope.productQuantity = data.pinv;
                        $scope.formSpinner = false;
                        $scope.editForm = true;
                    });
          } else {
            $scope.editThisProduct = false;
            $scope.saveProduct = true;
            $scope.editForm = true;
          }
          $scope.infinite = function(){
            $scope.productQuantity = 'Infinite';
          };
          $scope.editProduct = function(editProductId){
            $scope.spinner = true;
            console.log(editProductId);
            var userData = localStorageService.get('userData');
            var lid = userData.locations[0];
            if($scope.productQuantity == 'Infinite' || $scope.productQuantity == undefined){
              $scope.apiproductQuantity = -1;
            } else{
              $scope.apiproductQuantity =$scope.productQuantity;
            }
            var query = productFactory.editProduct({
              "prodId":editProductId,
              "pname": $scope.productName,
              "pdesc":$scope.productDescription,
              "price":$scope.productPrice,
              "pinv":$scope.apiproductQuantity,
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
            var userData = localStorageService.get('userData');
            var lid = userData.locations[0];
            if($scope.productQuantity == 'Infinite' || $scope.productQuantity == undefined){
              $scope.apiproductQuantity = -1;
            } else{
              $scope.apiproductQuantity =$scope.productQuantity;
            }

            var query = addProductFactory.save({
              "pname": $scope.productName,
              "pdesc":$scope.productDescription,
              "price":$scope.productPrice,
              "pinv":$scope.apiproductQuantity,
              "pinvdaily":false,
              "pcal":false,
              // "pimages":[data.filename],
              "pimages":['320145.jpg'],
              "pfeatures":false,
              "lid": lid
            });
      query.$promise.then(function(data) {
                        console.log(data);
                        $scope.spinner = false;
                        $scope.productName = '';
                        $scope.productPrice = '';
                        $scope.productQuantity = '';
                        $scope.productDescription = '';
                    });
                        $state.go('dashboard.productList');
                        upload($scope.picImage, 'https://protected-badlands-3499.herokuapp.com/prodfile');
       		console.log($scope.picImage);
          };
          
           // upload on file select or drop
     function upload (file, url) {
        Upload.upload({
            url: url,
            data: {fileName: file}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file);
        });
    };




$scope.back = function(){
            $state.go('dashboard.productList');
          };







};

})();