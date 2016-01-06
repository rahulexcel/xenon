(function() {
   'use strict';
angular.module('xenon-app')
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('myInterceptor');
});
})();