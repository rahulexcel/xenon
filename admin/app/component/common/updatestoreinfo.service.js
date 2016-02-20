(function() {
    'use strict';
    angular.module('xenon-app')
            .factory('updateStoreInfoService', updateStoreInfoService);
    function updateStoreInfoService(localStorageService, storeinfoLocationsIdFactory) {
        var service = {};
        service.updateStoreInfo = function() {
            console.log('service is called');
            var userData = localStorageService.get("userData");
        var locationid = userData.locations[0];
            var query = storeinfoLocationsIdFactory.get({}, {
            'locationid': locationid
        });
        query.$promise.then(function(data) {
            console.log(data);
            localStorageService.set('storeInfo', data);
            console.log('data is saved in localstorage');
        });
        }
     

        return service;
    }
})();