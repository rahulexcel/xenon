'use strict';
(function() {
    angular.module('xenon')
        .config(function(
            $stateProvider,
            $urlRouterProvider
        ) {
            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state('/#', {
                    url: "/",
                    templateUrl: "app/login/login-light.html",
                    controller: "loginctrl"
                })
                  .state('/reset', {
                    url: "/reset",
                    templateUrl: "app/resetpassword/resetpassword.html"
                    // controller: "loginctrl"
                })
                
        });

})();