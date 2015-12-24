(function() {
   'use strict';
   
       angular.module('xenon-app')
       .controller('productListController', productListController);
        function productListController($scope, productListFactory, productFactory, localStorageService) {
       		console.log("Product List Page");
       		var userData = localStorageService.get('userData');
            var lid = userData.locations[0];
       		var query = productListFactory.query({
            						'locationid': lid
						        });
						        query.$promise.then(function(data) {
						            console.log("Product List "+data);
						            $scope.productList = data;
						        });
			
			$scope.editProduct = function(id){
				console.log('id '+id);
				productFactory.editProduct({'prodId': id});
			};
			$scope.deleteProduct = function(id){
				console.log('id '+id);
				productFactory.deleteProduct({'productId': id});
			};
};

})();