(function() {
    'use strict';
    angular.module('xenon-app')
            .factory('openModelService', openModelService);
    function openModelService($rootScope, $modal, localStorageService) {
        var service = {};
        service.openModel = function(modal_id, modal_size, modal_backdrop) {
                        $rootScope.currentModal = $modal.open({
                            templateUrl: modal_id,
                            size: modal_size,
                            backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop
                        });
            };
        service.checknewUser = function() {
            var userData = localStorageService.get("userData");
                        if (angular.isDefined(userData)) {
                            if (userData.locations.length == 0) {
                                service.openModel('storeInfoModel', 'lg');
                            }
                        }
            };
        service.afterFirstSetupStore = function() {
                service.openModel('setupStoreInfoModel', 'lg');
            };
        service.openSettingModel = function() {
                service.openModel('settingModel', 'lg');
            };
        service.aftersaveSettingModel = function() {
                service.openModel('aftersaveSettingModel', 'lg');
            };
        return service;
    }
})();