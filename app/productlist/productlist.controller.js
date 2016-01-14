(function() {
    'use strict';

    angular.module('xenon-app')
            .controller('productListController', productListController);
    function productListController($scope, $timeout, $localStorage, userValidate, uploadService, categorylistService, categoryListFactory, addCategoryFactory, categoryFactory, productlistService, storeinfoLocationsIdFactory, productListFactory, productFactory, localStorageService, $rootScope, $state) {
        userValidate.validUserController();
        $scope.spinner = true;
        $scope.catSpinner = true;
        $scope.saveCategoryTreeStructure = false;
        
        var userData = localStorageService.get('userData');
        var lid = userData.locations[0];
        categoryListApi();
        function productListApi() {
            var query = productListFactory.query({
                'locationid': lid
            });
            query.$promise.then(function(data1) {
                $scope.spinner = false;
                $scope.displayProductList = productlistService.productlist($scope.catArr, data1);
                $scope.catSpinner = false;
                if ($scope.catArr[0] && $scope.catArr[0].level == 0) {
                    $scope.catArr.shift();
                }
                $scope.displaycatArr = categorylistService.categorylist($scope.catArr, data1);
            });
        }
        function categoryListApi() {
            var query1 = categoryListFactory.query({
                "locationId": lid,
            }, {});
            query1.$promise.then(function(data2) {
                //console.log(data2);
                $scope.catArr = data2;
                productListApi();
            });
        }
        $scope.editProduct = function(productId, productcatId) {
            console.log(productcatId);
            localStorageService.set('editProductId', productId);
            localStorageService.set('editProductcatId', productcatId);
            $state.go('dashboard.addProduct');
        };
        $scope.deleteProduct = function(id, index) {
            productFactory.deleteProduct({
                'productId': id
            });
        };
        $scope.addProductPage = function() {
            delete $localStorage.editProductId;
            delete $localStorage.editProductcatId;
            $state.go('dashboard.addProduct');
        };

        $scope.treeOptions = {
            accept: function(sourceNodeScope, destNodesScope, destIndex) {
                return true;
            },
            dropped: function(e) {
                if (e.dest.nodesScope.$parent.$type == "uiTree") {
                    $scope.saveCategoryTreeStructure = true;
                    console.log('Moving and Updating category');
                    for (var k = 0; k < e.source.nodeScope.$treeScope.$parent.$parent.catArr.length; k++) {
                        console.log(e.source.nodeScope.$treeScope.$parent.$parent.catArr[k].catname);
                        var query = categoryFactory.Update({}, {
                            'catid': e.source.nodeScope.$treeScope.$parent.$parent.catArr[k]._id,
                            'index': k
                        });
                        query.$promise.then(function(data) {
                            console.log(data);
                            $scope.saveCategoryTreeStructure = false;
                        });
                    }
                } else {
                    var destinationParentCategoryId = e.dest.nodesScope.$parent.$modelValue._id;
                    var destinationProductIds = [];
                    for (var i = 0; i < e.dest.nodesScope.$parent.$modelValue.products.length; i++) {
                        destinationProductIds.push(e.dest.nodesScope.$parent.$modelValue.products[i]._id);
                    }
                    console.log('destinationParentCategoryId: ' + destinationParentCategoryId);
                    console.log('destinationProductIds: ' + destinationProductIds);

                    var sourceParentCategoryId = e.source.nodeScope.$parent.$nodeScope.$modelValue._id;
                    var sourceProductIds = [];
                    for (var j = 0; j < e.source.nodeScope.$parentNodeScope.Arr.products.length; j++) {
                        sourceProductIds.push(e.source.nodeScope.$parentNodeScope.Arr.products[j]._id);
                    }
                    console.log('sourceParentCategoryId: ' + sourceParentCategoryId);
                    console.log('sourceProductIds: ' + sourceProductIds);

                    updateCategory(destinationParentCategoryId, destinationProductIds);
                    updateCategory(sourceParentCategoryId, sourceProductIds);
                }
            },
            beforeDrop: function(event) {
                if (event.dest.nodesScope.$id === event.source.nodesScope.$id) {
                    return true;
                }
                var is_source_category = false;
                var is_dest_category = false;
                if (event.source.nodeScope.$modelValue.title) {
                    is_source_category = true;
                }
                // console.log(event.dest.nodesScope.$parent.$type);
                if (event.dest.nodesScope.$parent.$type == "uiTree") {
                    is_dest_category = true;
                }
                // console.log(event);
                if (is_source_category) {
                    console.log('//we are moving category');
                    if (is_dest_category) {
                        console.log('//its fine to move category up/down');
                        return true;
                    } else {
                        console.log('//we cannot move category in product');
                        alertDanger();
                        return false;
                    }
                }
                if (!is_source_category) {
                    console.log('//we are moving a product');
                    if (!is_dest_category) {
                        console.log('//moving inside product is fine');
                        return true;
                    } else {
                        console.log('//cannot move product in parent category');
                        alertDanger();
                        return false;
                    }
                }
                return true;
            }
        };
        $scope.productTreeOption = {
            beforeDrop: function(event) {
                // console.log(event);
                if (event.dest.nodesScope.$parent.$type == "uiTree") {
                    alertDanger();
                    return false;
                }
                return true;
            },
            dropped: function(e) {
                var productIds = [];
                for (var i = 0; i < e.dest.nodesScope.$parent.$modelValue.products.length; i++) {
                    productIds.push(e.dest.nodesScope.$parent.$modelValue.products[i]._id);
                }
                updateCategory(e.dest.nodesScope.$parent.$modelValue._id, productIds);
            }
        }

        $scope.addCategory = function() {
            $scope.displaycatArr.push({"catname": $scope.categoryName, "lid": lid, "catproducts": [], "index": 1});
            var query = addCategoryFactory.save({}, {
                "catname": $scope.categoryName,
                "lid": lid,
                "catproducts": [],
                "index": 1
            });
            $scope.categoryName = '';
            query.$promise.then(function(data) {
                console.log(data);
            });
        };

        $scope.deleteCategory = function(categoryId) {
            console.log(categoryId);
            var query = categoryFactory.delete({}, {
                'catid': categoryId
            });
            query.$promise.then(function(data) {
                console.log(data);
                productListApi();
            });
        };

        $scope.productImage = function(productImageArray){
            if(productImageArray.length > 0){
                return 'http://s3.amazonaws.com/ordermagic/'+productImageArray[0];
            } else {
                return '';
            }
        };
        function updateCategory(categoryId, productIds) {
            $scope.saveCategoryTreeStructure = true;
            // console.log(categoryId);
            var query = categoryFactory.Update({}, {
                'catid': categoryId,
                'catproducts': productIds
            });
            query.$promise.then(function(data) {
                console.log(data);
                $scope.saveCategoryTreeStructure = false;
            });
        }
        ;

        function alertDanger() {
            $scope.alertDanger = true;
            $timeout(function() {
                $scope.alertDanger = false;
            }, 5000);
        }
    }
    ;

})();