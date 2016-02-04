(function() {
    'use strict';
    angular.module('xenon-frontend')
            .run(function($rootScope, $state, $localStorage, $translate, $timeout, validate) {
                validate.order_placed();

                init: callfunction();
                function callfunction() {
                    if (angular.isDefined($localStorage.used)) {
                        $translate.use($localStorage.used);
                        var proposedLanguage = $translate.proposedLanguage() || $translate.use($localStorage.used);
                    }
                    var proposedLanguage = $translate.proposedLanguage() || $translate.use(used);
                    var preferredLanguage = $translate.preferredLanguage();

                }
            })
})();