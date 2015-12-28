(function() {
   'use strict';
   
       angular.module('xenon-app')
       .controller('addProductController', addProductController);
        function addProductController($scope, addProductFactory, Upload, localStorageService, $rootScope, productListFactory, productFactory, $state) {
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
                    });
          } else {
            $scope.editThisProduct = false;
            $scope.saveProduct = true;
          }
          $scope.editProduct = function(editProductId){
            $scope.spinner = true;
            console.log(editProductId);
            $scope.productDescription = angular.element(document.querySelector('.CodeMirror-code pre span')).text();
            var userData = localStorageService.get('userData');
            var lid = userData.locations[0];
            var query = productFactory.editProduct({
              "prodId":editProductId,
              "pname": $scope.productName,
              "pdesc":$scope.productDescription,
              "price":$scope.productPrice,
              "pinv":-1,
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
       			$scope.productDescription = angular.element(document.querySelector('#uikit_editor_2')).val();
            var userData = localStorageService.get('userData');
            var lid = userData.locations[0];
       			var query = addProductFactory.save({
       				"pname": $scope.productName,
 					    "pdesc":$scope.productDescription,
 					    "price":$scope.productPrice,
 					    "pinv":-1,
 					    "pinvdaily":false,
 					    "pcal":false,
 					    "pimages":["353473874.jpg"],
 					    "pfeatures":false,
              "lid": lid
       			});
			query.$promise.then(function(data) {
                        console.log(data);
                        $scope.spinner = false;
                        $scope.productName = '';
                        $scope.productPrice = '';
                        angular.element(document.querySelector('.CodeMirror-code pre span')).text(' ');
                    });
       		};
};

})();