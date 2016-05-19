(function() {
    'use strict';
    angular.module('xenon-app')
            .factory('userValidate', userValidate);

    function userValidate(localStorageService, $state, $stateParams, $rootScope, $location, $pageLoadingBar) {



        return {
            validUser: function() {
                $rootScope.$on('$stateChangeStart',
                        function(event, toState, toParams, fromState, fromParams) {
                            var userData = localStorageService.get('userData');
                            if (userData) {
                                $rootScope.userNavMenu = true;
                                $rootScope.navMenu = false;
                                console.log(toState.url);
                                if (toState.url == '/setting' || toState.url == '/payment' || toState.url == '/productList' || toState.url == '/addProduct'
                                        || toState.url == '/productOrders' || toState.url == '/orderDetails' || toState.url == '/plans' || toState.url == '/storeinfo' || toState.url == '/welcome'|| toState.url == '/print') {

                                } else {
                                    $state.transitionTo("dashboard.storeinfo");
                                    event.preventDefault();
                                    $pageLoadingBar.showLoadingBar({
						pct: 100,
						delay: .65,
						resetOnEnd: true
					});

                                }
                            } else {
                                $rootScope.userNavMenu = false;
                                $rootScope.navMenu = true;
                                console.log(toState.url);
                                if (toState.url == '/login' || toState.url == '/signup' || toState.url == '/forgot' || toState.url == '/reset/:token') {
                              
                                } else {
                                    $state.transitionTo("dashboard.login");   
                                    event.preventDefault();
                                    					$pageLoadingBar.showLoadingBar({
						pct: 100,
						delay: .65,
						resetOnEnd: true
					});
                                   // $state.go("dashboard.login"); 
                                     
                                  

                                }
                            }
                        })
                $rootScope.userNavMenu = true;
                $rootScope.navMenu = false;


            }
        }
    }

})();