(function() {
    'use strict';
    angular.module('xenon-app')
            .factory('userValidate', userValidate);

    function userValidate(localStorageService, $state, $stateParams, $rootScope, $location) {
//         return {
//             validUser: function() {
//                 var userData = localStorageService.get('userData');
//                 if (userData) {
//                   $rootScope.$on('$stateChangeStart',
//                         function(event, toState, toParams, fromState, fromParams) {
//                             console.log(toState.url);
//                             if (toState.url == '/setting' || toState.url == '/payment' || toState.url == '/productList' || toState.url == '/addProduct' 
//                               || toState.url == '/productOrders'|| toState.url == '/orderDetails'|| toState.url == '/storeinfo') {

//                             } else {
//                                    $state.go('dashboard.storeinfo');
//                                   event.preventDefault();


//                             }
//                         })

//                     console.log('hai');
//                     $rootScope.userNavMenu = true;
//                     $rootScope.navMenu = false;

//                 } else {
//                     console.log('nhi');
//                     console.log($state.current.name);
//                     $rootScope.$on('$stateChangeStart',
//                         function(event, toState, toParams, fromState, fromParams) {
//                             console.log(toState.url);
//                             if (toState.url == '/login' || toState.url == '/signup' || toState.url == '/forgot' || toState.url == '/reset') {
//                                 console.log(toState.url);
//                             } else {
//                               $state.go('dashboard.login');
//                                 event.preventDefault();

//                             }
//                         })


//                     $rootScope.userNavMenu = false;
//                     $rootScope.navMenu = true;
//                 }
//             }
//         }
//     }

// })();




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
                                        || toState.url == '/productOrders' || toState.url == '/orderDetails' || toState.url == '/storeinfo') {

                                } else {
                                    $state.go("dashboard.storeinfo");
                                    event.preventDefault();

                                }
                            } else {
                                $rootScope.userNavMenu = false;
                                $rootScope.navMenu = true;
                                if (toState.url == '/login' || toState.url == '/signup' || toState.url == '/forgot' || toState.url == '/reset/3f962ba188383621c8c44fec0bfe5dd8638d342f') {
                                } else {
                                    event.preventDefault();
                                    //$state.transitionTo('dashboard.login');
                                    $location.path('/login');

                                }
                            }
                        })

                console.log('hai');
                $rootScope.userNavMenu = true;
                $rootScope.navMenu = false;


            }
        }
    }

})();