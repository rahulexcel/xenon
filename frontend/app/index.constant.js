(function() {
   'use strict';
   angular.module('xenon-frontend')
           .constant('Configurations', {
               Hostserver: 'https://protected-badlands-3499.herokuapp.com'
           })
           .constant('locationID', {
           // locationID:'56d52c86889ab611009c33ae'
                locationID: '56b42cfa34ca681100566c78'
//              locationID: '56b471d334ca681100566c91'
           })
            .constant('stripekey', {
               Key: 'pk_test_2r2Z7iDQOTj5hLUlAsdeSFrs'
           });
           
})();