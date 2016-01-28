(function() {
   'use strict';
   angular.module('xenon-app')
       .factory('signupFactory', signupFactory);

   function signupFactory($resource, Configurations) {
       return $resource(Configurations.Hostserver+'/reg/:email/:password', {},{});
   };
})();