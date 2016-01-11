(function() {
    'use strict';
    angular.module('xenon-app')
            .factory('addProductService', addProductService);

    function addProductService(localStorageService, categoryListFactory, $q, categoryFactory) {
        var def = $q.defer();
        var userData = localStorageService.get('userData');
        var lid = userData.locations[0];
        var service = {};
        service.updateCategoryList = function(selectedCategoryArray, productId) {
            //console.log(selectedCategoryArray);
            var myObject = JSON.parse(selectedCategoryArray);
            myObject.catproducts.push(productId);
            console.log(myObject.catproducts);
            var query = categoryFactory.Update({}, {
                'catid': myObject._id,
                'catproducts': myObject.catproducts
            });
            query.$promise.then(function(data) {
                console.log(data);
            });
        };
        return service;
    }
})();