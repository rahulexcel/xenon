(function() {
   'use strict';
   angular.module('xenon-frontend')
   .config(function($stateProvider, $urlRouterProvider){    
    $stateProvider.
    state('frontend', {
            url: '/frontend',
            templateUrl: "app/front/frontend.html",
            controller: 'frontendCtrl'
        })
    .
    state('checkout', {
            url: '/checkout',
            templateUrl: "app/checkout/checkout.html",
            controller: 'checkoutCtrl'
        });;
    $urlRouterProvider.otherwise('/frontend');
     });
})();