(function() {
   'use strict';
   
       angular.module('xenon-app')
       .controller('addProductController', addProductController);
        function addProductController($scope, addProductService, addProductFactory, Upload, localStorageService, $rootScope, productListFactory, productFactory, $state, imageUploadFactory) {
        console.log("Add Product Page");
        addProductService.getCategoryList().then(function(categorylist){
        $scope.categorylist = categorylist;
        });

        var after_load_image_response;
        var flag_for_cheking_add_or_edit=0;
        var edit_Product_Id;
          if($rootScope.editProductId){
            flag_for_cheking_add_or_edit=1;
            $scope.formSpinner = true;
            $scope.editForm = false;
          //  console.log('Edit Product Id: '+$rootScope.editProductId);
            $scope.editThisProduct = true;
            $scope.saveProduct = false;
            var query = productListFactory.singleProduct({"productId": $rootScope.editProductId});
            query.$promise.then(function(data) {
                        console.log(data); 
                          if (angular.isDefined(data.pimages[0])) {
                             $scope.croppedDataUrl = 'http://s3.amazonaws.com/ordermagic/'+data.pimages[0];
                             } 
                      //$scope.picImage='http://s3.amazonaws.com/ordermagic/'+
                      after_load_image_response=$scope.croppedDataUrl;
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
          $scope.editProduct = function(editProductId, picImageurl){
            edit_Product_Id=editProductId;
            $scope.spinner = true;
             if($scope.croppedDataUrl==after_load_image_response){
                  edit_product_after_uploader_response();
         
            }else{
                  $scope.spinner = true;
                   upload(picImageurl, 'https://protected-badlands-3499.herokuapp.com/prodfile');
                 }
          };
          function edit_product_after_uploader_response(){
             var userData = localStorageService.get('userData');
            var lid = userData.locations[0];
            if($scope.productQuantity == 'Infinite' || $scope.productQuantity == undefined){
              $scope.apiproductQuantity = -1;
            } else{
              $scope.apiproductQuantity =$scope.productQuantity;
            }
            var query = productFactory.editProduct({
              "prodId":edit_Product_Id,
              "pname": $scope.productName,
              "pdesc":$scope.productDescription,
              "price":$scope.productPrice,
              "pinv":$scope.apiproductQuantity,
              "pinvdaily":false,
              "pcal":false,
              "pimages":uploadResponseFileName,
              "pfeatures":false,
              "lid": lid
            });
      query.$promise.then(function(data) {
                        console.log(data);
                        if($scope.selectedCategoryArray){
                         addProductService.updateCategoryList($scope.selectedCategoryArray,data.data._id);
                        }
                        $state.go('dashboard.productList');
                    });
          }


          $scope.addProduct = function(picImageurl){
            if($scope.croppedDataUrl==after_load_image_response){
                  send_data_after_uploader_response();
         
            }else{
                  $scope.spinner = true;
                   upload(picImageurl, 'https://protected-badlands-3499.herokuapp.com/prodfile');
                 }


               };
           
           function send_data_after_uploader_response(){
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
              "pimages":uploadResponseFileName,
              "pfeatures":false,
              "lid": lid
            });
      query.$promise.then(function(data) {
                        // console.log(data);
                        if($scope.selectedCategoryArray){
                         addProductService.updateCategoryList($scope.selectedCategoryArray,data.data._id);
                        }
                        $scope.spinner = false;
                        $scope.productName = '';
                        $scope.productPrice = '';
                        $scope.productQuantity = '';
                        $scope.productDescription = '';
                    });
                         $state.go('dashboard.productList');
                       
           }
           // upload on file select or drop
       var uploadResponseFileName;    
     function upload (file, url) {
        Upload.upload({
            url: url,
            data: {fileName: file}
        }).then(function (resp) {
            uploadResponseFileName = resp.data.filename;
            console.log(uploadResponseFileName);
            if(flag_for_cheking_add_or_edit==1){
              edit_product_after_uploader_response();
            }else{
            send_data_after_uploader_response();
          }
            //console.log('Success ' + resp.config.data.file + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
           // console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
           // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file);
        });
    };




$scope.back = function(){
            $state.go('dashboard.productList');
          };







};

})();