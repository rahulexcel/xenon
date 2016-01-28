(function() {
   'use strict';
   angular.module('xenon-app')
       .factory('storeinfoLocationsFactory', storeinfoLocationsFactory);
   function storeinfoLocationsFactory($resource, Configurations) {
       return $resource(Configurations.Hostserver+'/locations/:eid', {},{});
    };

})();

