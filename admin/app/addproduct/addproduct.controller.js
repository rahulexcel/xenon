

(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('addProductController', addProductController);
    function addProductController($scope, uploadService,remainingStatusservice, categoryListFactory, addProductService, addProductFactory, Upload, localStorageService, $rootScope, productListFactory, productFactory, $state, imageUploadFactory) {
        var userData = localStorageService.get('userData');
        var lid = userData.locations[0];
        var after_load_image_response;
        var flag_for_cheking_add_or_edit = 0;
        var storeData = localStorageService.get('storeInfo');
        $scope.currency = storeData.lcurrency; 
        $scope.formSpinner = true;
        var editProductId = localStorageService.get('editProductId');
        var uploadResponseFileName;
        var query = categoryListFactory.query({
            "locationId": lid,
        }, {});
        query.$promise.then(function(categoryList) {
           categoryList[0].catname="Level 0 (No category)";                
            $scope.categorylist = categoryList;
            $scope.selectedCategoryId= $scope.categorylist[0]._id;
            console.log($scope.categorylist[0]._id);
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
                    after_load_image_response = $scope.picImage;
                    $scope.productName = data.pname;
                    $scope.productDescription = data.pdesc;
                    $scope.productPrice = data.price;
                    $scope.showInStore = data.pinvdaily;
                    $scope.selectedCategoryId = editProductcatId;
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

        $scope.productQuantity = 'Infinite';
        $scope.infinite = function() {
            $scope.productQuantity = 'Infinite';
        };
        $scope.editProduct = function() {
            if ($scope.productName &&  $scope.productPrice) {
                $scope.spinner = true;
                if ($scope.picImage == after_load_image_response) {
                    edit_product_after_uploader_response();
                } else {
                    uploadService.send($scope.picImage, 'prodfile')
                            .then(function(response) {
                                uploadResponseFileName = response.filename;
                                edit_product_after_uploader_response();
                                console.log(response)
                            });
                }
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
            if ($scope.productName && $scope.selectedCategoryId && $scope.productPrice) {
                $scope.spinner = true;
                if ($scope.picImage == after_load_image_response) {
                    send_data_after_uploader_response();
                } else {
                    uploadService.send($scope.picImage, 'prodfile')
                            .then(function(response) {
                                console.log(response);
                                uploadResponseFileName = response.filename;
                                send_data_after_uploader_response();
                                
                            });
                }
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
                 remainingStatusservice.remainingStatus();
                var storeInfo = localStorageService.get('storeInfo');
                if(storeInfo.lcompleted.length == 2 || storeInfo.lcompleted.length == 3){
                    $state.go('dashboard.welcome');
                } else{
                    $state.go('dashboard.productList');
                }
            });
        }
        $scope.back = function() {
            $state.go('dashboard.productList');
        };
    }
    ;

})();
