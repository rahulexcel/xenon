(function() {
    'use strict';

    angular.module('xenon-app')
        .controller('productListController', productListController);
    function productListController($scope, $timeout, categoryListFactory, addCategoryFactory, categoryFactory, productlistService, storeinfoLocationsIdFactory, productListFactory, productFactory, localStorageService, $rootScope, $state) {
        var catArr = [];
        var firstapidata=[];
        var secondapidata=[];
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
                $scope.productList = productlistService.productlist($scope.catArr, data1);

                console.log($scope.catArr);
                console.log(data1);
                for(var i =0; i <$scope.catArr.length; i++){
                    console.log($scope.catArr[i].catproducts);
                }











            });
        }
        function categoryListApi() {
            var query1 = categoryListFactory.query({
                "locationId": lid,
            }, {});
            query1.$promise.then(function(data2) {
                //console.log(data2);
              $scope.catArr = data2;
               $scope.catSpinner = false;
              productListApi();
                
            });
        }
        // function secondapi() {
        //     var query1 = storeinfoLocationsIdFactory.get({}, {
        //         'locationid': userData.locations[0]
        //     });
        //     query1.$promise.then(function(data2) {
        //       // console.log(data2.lpcats);
        //       $scope.catArr = data2.lpcats;
        //       $scope.catSpinner = false;
        //       firstapi();
                
        //     });
        // }
        $scope.editProduct = function(id) {
            $rootScope.editProductId = id;
            $state.go('dashboard.addProduct');
        };
        $scope.deleteProduct = function(id, index) {
            productFactory.deleteProduct({
                'productId': id
            });
            $scope.productList.splice(index, 1)
        };
        $scope.addProductPage = function() {
            $rootScope.editProductId = '';
            $state.go('dashboard.addProduct');
        };

        $scope.treeOptions = {
            accept: function(sourceNodeScope, destNodesScope, destIndex) {
                return true;
            },
            dropped: function(e) {
                console.log(e);
                console.log ('Parent Category Id: '+e.dest.nodesScope.$parent.$modelValue._id);
                console.log('Dropped Product Id: '+e.source.nodeScope.$modelValue._id);
                // saveCategoryStructure();
                // updateCategory(e.dest.nodesScope.$parent.$modelValue._id,e.source.nodeScope.$modelValue._id);
            },
            beforeDrop: function(event) {
                if(event.dest.nodesScope.$id === event.source.nodesScope.$id){
                    return true;
                }
                var is_source_category = false;
                var is_dest_category = false;
                if(event.source.nodeScope.$modelValue.title){
                    is_source_category = true;
                }
                // console.log(event.dest.nodesScope.$parent.$type);
                if(event.dest.nodesScope.$parent.$type == "uiTree"){
                    is_dest_category = true;
                }

                // console.log(event);

                if(is_source_category){
                    console.log('//we are moving category');
                    if(is_dest_category){
                        console.log('//its fine to move category up/down');
                        return true;
                    }else{
                        console.log('//we cannot move category in product');
                        alertDanger();
                        return false;
                    }

                }

                if(!is_source_category){
                    console.log('//we are moving a product');
                    if(!is_dest_category){
                        console.log('//moving inside product is fine');
                        return true;
                    }else{
                        console.log('//cannot move product in parent category');
                        alertDanger();
                        return false;
                    }
                }

                return true;
            }
        };
        $scope.productTreeOption = {
            beforeDrop : function(event){
                // console.log(event);
                if(event.dest.nodesScope.$parent.$type == "uiTree"){
                    alertDanger();
                    return false;
                }
                return true;
            },
            dropped: function(e) {
                // console.log (e);
                console.log ('Parent Category Id: '+e.dest.nodesScope.$parent.$modelValue._id);
                console.log('Dropped Product Id: '+e.source.nodeScope.$modelValue._id);
                // saveCategoryStructure();
                // updateCategory(e.dest.nodesScope.$parent.$modelValue._id,e.source.nodeScope.$modelValue._id);
            }
        }




        $scope.categoryForm = function() {

        }
        $scope.saveCategory = function() {
            //console.log(JSON.stringify($scope.catArr));
            //console.log($scope.catArr);
                      
                      //console.log(JSON.stringify($scope.catArr));
                 var query = addCategoryFactory.save({}, {
                 "catname": $scope.name,
                      "lid": lid,
                      "catproducts": [],
                     "index" : 1
            });
            query.$promise.then(function(data) {
                $scope.name = '';
                //console.log(data.data.lpcats);
                //$scope.catArr = data.lpcats;
            });
 
        };
        // $scope.saveCategory = function() {
        //     //console.log(JSON.stringify($scope.catArr));
        //     //console.log($scope.catArr);
        //     if($scope.catArr){
        //         var lpcats = {
        //                 "catname": $scope.name,
        //                 "lid": lid,
        //                 "catproducts": []
        //               }
        //               $scope.catArr.push(lpcats);
        //               //console.log(JSON.stringify($scope.catArr));
        //          var query = storeinfoLocationsIdFactory.update({}, {
        //         'locationid': userData.locations[0],
        //         'lpcats': $scope.catArr
        //     });
        //     query.$promise.then(function(data) {
        //         $scope.name = '';
        //         //console.log(data.data.lpcats);
        //         //$scope.catArr = data.lpcats;
        //     });
        //         } else {
        //     var query = storeinfoLocationsIdFactory.update({}, {
        //         'locationid': userData.locations[0],
        //         'lpcats': {
        //                 "catname": $scope.name,
        //                 "lid": lid,
        //                 "catproducts": []
        //               }
        //     });
        //     query.$promise.then(function(data) {
        //         $scope.name = '';
        //         //console.log(data.data.lpcats);
        //         $scope.catArr = data.lpcats;
        //     });
        //     }
        // };

$scope.deleteCategory = function(categoryId){
    console.log(categoryId);
    var query = categoryFactory.delete({}, {
                'catid': categoryId
            });
            query.$promise.then(function(data) {
                console.log(data);
            });
    // console.log(index);
    // $scope.catArr.splice(index, 1);
    // var query = storeinfoLocationsIdFactory.update({}, {
    //             'locationid': userData.locations[0],
    //             'lpcats': $scope.catArr
    //         });
    // console.log($scope.catArr);
};
function updateCategory(categoryId, productId){
    console.log(categoryId);
    var query = categoryFactory.Update({}, {
                'catid': categoryId,
                'catproducts': productId
            });
            query.$promise.then(function(data) {
                console.log(data);
            });
};
$scope.saveStructure = function(){
    saveCategoryStructure();
}

function saveCategoryStructure(){
    $scope.saveCategoryTreeStructure = true;
    // var query = storeinfoLocationsIdFactory.update({}, {
    //             'locationid': userData.locations[0],
    //             'lpcats': $scope.catArr
    //         });
    // query.$promise.then(function(data) {
    // $scope.saveCategoryTreeStructure = false;
    //         });
};
      
function alertDanger(){
$scope.alertDanger = true;
 $timeout(function() {
        $scope.alertDanger = false;
    }, 5000);
}


   
     };

})();


// (function() {
//    'use strict';
   
//        angular.module('xenon-app')
//        .controller('productListController', productListController);
//         function productListController($scope, productListFactory, productFactory, localStorageService, $rootScope, $state) {
//          console.log("Product List Page");
//          $scope.spinner = true;
//          var userData = localStorageService.get('userData');
//             var lid = userData.locations[0];
//          var query = productListFactory.query({
//                   'locationid': lid
//               });
//               query.$promise.then(function(data) {
//                   console.log("Product List "+data);
//                   $scope.productList = data;
//                   $scope.spinner = false;
//               });
   
//    $scope.editProduct = function(id){
//     console.log('id '+id);
//     $rootScope.editProductId = id;
//     $state.go('dashboard.addProduct');
//     // productFactory.editProduct({'prodId': id});
//    };
//    $scope.deleteProduct = function(id, index){
//     console.log('id '+id);
//     productFactory.deleteProduct({'productId': id});
//     $scope.productList.splice(index,1)
//    };
//    $scope.addProductPage = function(){
//     $rootScope.editProductId = '';
//     $state.go('dashboard.addProduct');
//    };
//      $scope.nodes=[11,12,34,45,56,6,554,564564,65564564];
//      // here you define the events in a treeOptions collection
//        $scope.treeOptions = {
//             accept: function(sourceNodeScope, destNodesScope, destIndex) {
//                 return true;
//             },
//             dropped: function(e) {
                
//             }
//         };
      

    
    // $scope.data = [{
    //     'id': 1,
    //     'title': 'node1',
    //     'nodes': [
    //       {
    //         'id': 11,
    //         'title': 'node1.1',
    //         'nodes': [
    //           {
    //             'id': 111,
    //             'title': 'node1.1.1',
    //             'nodes': []
    //           }
    //         ]
    //       },
    //       {
    //         'id': 12,
    //         'title': 'node1.2',
    //         'nodes': []
    //       }
    //     ]
    //   }, {
    //     'id': 2,
    //     'title': 'node2',
    //     'nodrop': true, // An arbitrary property to check in custom template for nodrop-enabled
    //     'nodes': [
    //       {
    //         'id': 21,
    //         'title': 'node2.1',
    //         'nodes': []
    //       },
    //       {
    //         'id': 22,
    //         'title': 'node2.2',
    //         'nodes': []
    //       }
    //     ]
    //   }, {
    //     'id': 3,
    //     'title': 'node3',
    //     'nodes': [
    //       {
    //         'id': 31,
    //         'title': 'node3.1',
    //         'nodes': []
    //       }
    //     ]
    //   }];
   
   
// };

// })();