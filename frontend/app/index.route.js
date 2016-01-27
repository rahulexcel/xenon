(function() {
   'use strict';
   angular.module('xenon-frontend')
   .config(function($stateProvider, $urlRouterProvider){    
    $stateProvider.
    state('frontend', {
            url: '/frontend',
            templateUrl: "app/front/frontend.html",
            controller: 'frontendCtrl'
        });
    $urlRouterProvider.otherwise('/frontend');
     });
})();