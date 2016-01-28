(function() {
   'use strict';
   angular.module('xenon-app')
       .factory('storeinfoFactory', storeinfoFactory);

   function storeinfoFactory($resource, Configurations) {   	  
       return $resource(Configurations.Hostserver+'/loc/:lname/:ldesc/:lemail/:llogo/:laddr/:lpostcode/:lcity/:lcountry/:lphone/:llt/:lmessage/:lopentime/:lclosetime', {},{});
   };
})();                                             