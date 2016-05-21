(function() {
    'use strict';
    angular
            .module('xenon-frontend')
            .config(translateConfig);
    function translateConfig($translateProvider, IdleProvider, KeepaliveProvider) {
         IdleProvider.idle(1800);
        $translateProvider.useStaticFilesLoader({
            prefix: 'app/i18n/',
            suffix: '.json'
        });
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.preferredLanguage('English-UK');
        $translateProvider.usePostCompiling(true);     
    }   
})();
