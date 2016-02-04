(function() {
    'use strict';
    angular
        .module('xenon-frontend')
        .config(translateConfig);
    function translateConfig($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'app/i18n/',
            suffix: '.json'
        });
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.preferredLanguage('English');
        $translateProvider.usePostCompiling(true);
    }
})();
