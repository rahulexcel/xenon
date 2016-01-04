(function() {
    'use strict';

    angular.module('xenon-app')
        .controller('productListController', productListController);
    function productListController($scope, storeinfoLocationsIdFactory, productListFactory, productFactory, localStorageService, $rootScope, $state) {
        var catArr = [];
        var firstapidata=[];
        var secondapidata=[];
        $scope.spinner = true;
        $scope.spinner = true;
        var userData = localStorageService.get('userData');
        var lid = userData.locations[0];
        firstapi();
        function firstapi() {
            var query = productListFactory.query({
                'locationid': lid
            });
            query.$promise.then(function(data1) {
                $scope.spinner = false;
                firstapidata=data1;
                $scope.spinner = false;
                secondapi();
                
            });
        }
        function secondapi() {
            var query1 = storeinfoLocationsIdFactory.update({}, {
                'locationid': userData.locations[0]
            });
              query1.$promise.then(function(data2) {
              console.log(data2.data.lpcats);
              $scope.catArr=data2.data.lpcats;  
              if(data2.data.lpcats===null){
                alert("y");
              } 
              else{
                alert("n");
              }
            });
        }
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
            }
        };
        $scope.categoryForm = function() {
        }
        $scope.saveCategory = function() {
            catArr.push($scope.name);
            var query = storeinfoLocationsIdFactory.update({}, {
                'locationid': userData.locations[0],
                'lpcats': catArr
            });
            query.$promise.then(function(data){
                    for (var i = 0; i <= data.data.lpcats.length; i++) {
                    if (angular.isArray(data.data.lpcats[i])) {
                        catArr.push(data.data.lpcats[i]);
                    }
                }
                $scope.catArr = catArr;
            });
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