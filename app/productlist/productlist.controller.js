(function() {
   'use strict';
   
       angular.module('xenon-app')
       .controller('productListController', productListController);
        function productListController($scope, productListFactory, productFactory, localStorageService, $rootScope, $state) {
       		console.log("Product List Page");
       		$scope.spinner = true;
       		var userData = localStorageService.get('userData');
            var lid = userData.locations[0];
       		var query = productListFactory.query({
            						'locationid': lid
						        });
						        query.$promise.then(function(data) {
						            console.log("Product List "+data);
						            $scope.productList = data;
						            $scope.spinner = false;
						        });
			
			$scope.editProduct = function(id){
				console.log('id '+id);
				$rootScope.editProductId = id;
				$state.go('dashboard.addProduct');
				// productFactory.editProduct({'prodId': id});
			};
			$scope.deleteProduct = function(id, index){
				console.log('id '+id);
				productFactory.deleteProduct({'productId': id});
				$scope.productList.splice(index,1)
			};
			$scope.addProductPage = function(){
				$rootScope.editProductId = '';
				$state.go('dashboard.addProduct');
			};
};

})();