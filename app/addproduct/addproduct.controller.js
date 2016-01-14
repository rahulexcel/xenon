(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('addProductController', addProductController);
    function addProductController($scope, uploadService, userValidate, categoryListFactory, addProductService, addProductFactory, Upload, localStorageService, $rootScope, productListFactory, productFactory, $state, imageUploadFactory) {
        console.log("Add Product Page");
        userValidate.validUserController();
        var userData = localStorageService.get('userData');
        var lid = userData.locations[0];
        var after_load_image_response;
        var flag_for_cheking_add_or_edit = 0;
       
        $scope.formSpinner = true;
        var editProductId = localStorageService.get('editProductId');
        var uploadResponseFileName;
        var query = categoryListFactory.query({
                "locationId": lid,
            }, {});
            query.$promise.then(function(categoryList) {
            console.log(categoryList);
            if (categoryList[0].level == 0) {
                categoryList.shift();
            }
            $scope.categorylist = categoryList;
            $scope.formSpinner = false;
            if (editProductId) {
            var editProductcatId = localStorageService.get('editProductcatId');
            flag_for_cheking_add_or_edit = 1;
            $scope.formSpinner = true;
            $scope.editForm = false;
            $scope.editThisProduct = true;
            $scope.saveProduct = false;
            var query = productListFactory.singleProduct({"productId": editProductId});
            query.$promise.then(function(data) {
                
               
                if (angular.isDefined(data.pimages[0])) {
                    $scope.picImage = 'http://s3.amazonaws.com/ordermagic/' + data.pimages[0];
                }
                after_load_image_response =$scope.picImage;
                $scope.productName = data.pname;
                $scope.productDescription = data.pdesc;
                $scope.productPrice = data.price;
                $scope.showInStore = data.pinvdaily;
                $scope.selectedCategoryId =  editProductcatId;
                if (data.pinv == -1) {
                    $scope.productQuantity = 'Infinite';
                } else {
                    $scope.productQuantity = data.pinv;
                }
                $scope.formSpinner = false;
                $scope.editForm = true;
            });
        } else {
            $scope.editThisProduct = false;
            $scope.saveProduct = true;
            $scope.editForm = true;
        }
        });

        
        
        $scope.infinite = function() {
            $scope.productQuantity = 'Infinite';
        };
        $scope.editProduct = function() {
            $scope.spinner = true;
  if ($scope.picImage == after_load_image_response) {
   edit_product_after_uploader_response();
  } else {
   uploadService.send($scope.picImage, 'prodfile')
                   .then(function(response) {
                     uploadResponseFileName=response.filename;
                      edit_product_after_uploader_response();
         console.log(response)
       });
  }
        };


         function edit_product_after_uploader_response() {
            if ($scope.productQuantity == 'Infinite' || $scope.productQuantity == undefined) {
                $scope.apiproductQuantity = -1;
            } else {
                $scope.apiproductQuantity = $scope.productQuantity;
            }
            var query = productFactory.editProduct({
                "prodId": editProductId,
                "pname": $scope.productName,
                "pdesc": $scope.productDescription,
                "price": $scope.productPrice,
                "pinv": $scope.apiproductQuantity,
                "pinvdaily": $scope.showInStore,
                "pcal": false,
                "pimages": uploadResponseFileName,
                "pfeatures": false,
                "lid": lid,
                "pcatid": $scope.selectedCategoryId
            });
            query.$promise.then(function(data) {
                console.log(data);
                $state.go('dashboard.productList');
            });
        }

        $scope.addProduct = function() {
            $scope.spinner = true;
  if ($scope.picImage == after_load_image_response) {
   send_data_after_uploader_response();
  } else {
   uploadService.send($scope.picImage, 'prodfile')
                   .then(function(response) {
                    console.log(response);
                     uploadResponseFileName=response.filename;
                      send_data_after_uploader_response();
         console.log(response)
       });
  }
        };

        function send_data_after_uploader_response() {
            var userData = localStorageService.get('userData');
            var lid = userData.locations[0];
            if ($scope.productQuantity == 'Infinite' || $scope.productQuantity == undefined) {
                $scope.apiproductQuantity = -1;
            } else {
                $scope.apiproductQuantity = $scope.productQuantity;
            }
            var query = addProductFactory.save({
                "pname": $scope.productName,
                "pdesc": $scope.productDescription,
                "price": $scope.productPrice,
                "pinv": $scope.apiproductQuantity,
                "pinvdaily": $scope.showInStore,
                "pcal": false,
                "pimages": uploadResponseFileName,
                "pfeatures": false,
                "lid": lid,
                "pcatid": $scope.selectedCategoryId
            });
            query.$promise.then(function(data) {
                console.log(data);
                $scope.spinner = false;
                $scope.productName = '';
                $scope.productPrice = '';
                $scope.productQuantity = '';
                $scope.productDescription = '';
                $state.go('dashboard.productList');
            });
        }
        $scope.back = function() {
            $state.go('dashboard.productList');
        };
    }
    ;

})();

























// (function() {
//     'use strict';

//     angular.module('xenon-app')
//             .controller('addProductController', addProductController);
//     function addProductController($scope, categoryListFactory, addProductService, addProductFactory, Upload, localStorageService, $rootScope, productListFactory, productFactory, $state, imageUploadFactory) {
//         console.log("Add Product Page");
//         var userData = localStorageService.get('userData');
//         var lid = userData.locations[0];
//         var after_load_image_response;
//         var flag_for_cheking_add_or_edit = 0;
//         $scope.formSpinner = true;
//         var editProductId = localStorageService.get('editProductId');
//         var query = categoryListFactory.query({
//                 "locationId": lid,
//             }, {});
//             query.$promise.then(function(categoryList) {
//             console.log(categoryList);
//             if (categoryList[0].level == 0) {
//                 categoryList.shift();
//             }
//             $scope.categorylist = categoryList;
//             $scope.formSpinner = false;
//             if (editProductId) {
//             var editProductcatId = localStorageService.get('editProductcatId');
//             flag_for_cheking_add_or_edit = 1;
//             $scope.formSpinner = true;
//             $scope.editForm = false;
//             $scope.editThisProduct = true;
//             $scope.saveProduct = false;
//             var query = productListFactory.singleProduct({"productId": editProductId});
//             query.$promise.then(function(data) {
//                 console.log(data);
//                 if (angular.isDefined(data.pimages[0])) {
//                     $scope.picImage = 'http://s3.amazonaws.com/ordermagic/' + data.pimages[0];
//                 }
//                 after_load_image_response = $scope.picImage;
//                 $scope.productName = data.pname;
//                 $scope.productDescription = data.pdesc;
//                 $scope.productPrice = data.price;
//                 $scope.showInStore = data.pinvdaily;
//                 $scope.selectedCategoryId =  editProductcatId;
//                 if (data.pinv == -1) {
//                     $scope.productQuantity = 'Infinite';
//                 } else {
//                     $scope.productQuantity = data.pinv;
//                 }
//                 $scope.formSpinner = false;
//                 $scope.editForm = true;
//             });
//         } else {
//             $scope.editThisProduct = false;
//             $scope.saveProduct = true;
//             $scope.editForm = true;
//         }
//         });

        
        
//         $scope.infinite = function() {
//             $scope.productQuantity = 'Infinite';
//         };
//         $scope.editProduct = function() {
//             $scope.spinner = true;
//             if ($scope.picImage == after_load_image_response) {
//                 edit_product_after_uploader_response();
//             } else {
//                 $scope.spinner = true;
//                 upload($scope.picImage, 'https://protected-badlands-3499.herokuapp.com/prodfile');
//             }
//         };
//         function edit_product_after_uploader_response() {
//             if ($scope.productQuantity == 'Infinite' || $scope.productQuantity == undefined) {
//                 $scope.apiproductQuantity = -1;
//             } else {
//                 $scope.apiproductQuantity = $scope.productQuantity;
//             }
//             var query = productFactory.editProduct({
//                 "prodId": editProductId,
//                 "pname": $scope.productName,
//                 "pdesc": $scope.productDescription,
//                 "price": $scope.productPrice,
//                 "pinv": $scope.apiproductQuantity,
//                 "pinvdaily": $scope.showInStore,
//                 "pcal": false,
//                 "pimages": uploadResponseFileName,
//                 "pfeatures": false,
//                 "lid": lid,
//                 "pcatid": $scope.selectedCategoryId
//             });
//             query.$promise.then(function(data) {
//                 console.log(data);
//                 $state.go('dashboard.productList');
//             });
//         }

//         $scope.addProduct = function() {
//             $scope.spinner = true;
//             if ($scope.picImage == after_load_image_response) {
//                 send_data_after_uploader_response();
//             } else {
//                 $scope.spinner = true;
//                 upload($scope.picImage, 'https://protected-badlands-3499.herokuapp.com/prodfile');
//             }
//         };

//         function send_data_after_uploader_response() {
//             var userData = localStorageService.get('userData');
//             var lid = userData.locations[0];
//             if ($scope.productQuantity == 'Infinite' || $scope.productQuantity == undefined) {
//                 $scope.apiproductQuantity = -1;
//             } else {
//                 $scope.apiproductQuantity = $scope.productQuantity;
//             }
//             var query = addProductFactory.save({
//                 "pname": $scope.productName,
//                 "pdesc": $scope.productDescription,
//                 "price": $scope.productPrice,
//                 "pinv": $scope.apiproductQuantity,
//                 "pinvdaily": $scope.showInStore,
//                 "pcal": false,
//                 "pimages": uploadResponseFileName,
//                 "pfeatures": false,
//                 "lid": lid,
//                 "pcatid": $scope.selectedCategoryId
//             });
//             query.$promise.then(function(data) {
//                 console.log(data);
//                 $scope.spinner = false;
//                 $scope.productName = '';
//                 $scope.productPrice = '';
//                 $scope.productQuantity = '';
//                 $scope.productDescription = '';
//                 $state.go('dashboard.productList');
//             });
//         }
//         // upload on file select or drop
//         var uploadResponseFileName;
//         function upload(file, url) {
//             Upload.upload({
//                 url: url,
//                 data: {fileName: file}
//             }).then(function(resp) {
//                 uploadResponseFileName = resp.data.filename;
//                 console.log(uploadResponseFileName);
//                 if (flag_for_cheking_add_or_edit == 1) {
//                     edit_product_after_uploader_response();
//                 } else {
//                     send_data_after_uploader_response();
//                 }
//                 //console.log('Success ' + resp.config.data.file + 'uploaded. Response: ' + resp.data);
//             }, function(resp) {
//                 // console.log('Error status: ' + resp.status);
//             }, function(evt) {
//                 var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//                 // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file);
//             });
//         }
//         ;
//         $scope.back = function() {
//             $state.go('dashboard.productList');
//         };
//     }
//     ;

// })();