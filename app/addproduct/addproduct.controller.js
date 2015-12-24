(function() {
   'use strict';
   
       angular.module('xenon-app')
       .controller('addProductController', addProductController);
        function addProductController($scope, addProductFactory, Upload, localStorageService) {
       		console.log("Add Product Page");
       		$scope.addProduct = function(){
       			$scope.productDescription = angular.element(document.querySelector('#uikit_editor_2')).val();

       			// console.log($scope.productImage+$scope.productName+$scope.productPrice+$scope.productDescription+$scope.productQuantity+$scope.showInStore);
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
                    });
       		};
};

})();