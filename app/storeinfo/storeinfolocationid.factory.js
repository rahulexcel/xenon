(function() {
   'use strict';
   angular.module('xenon-app')
       .factory('storeinfoLocationsIdFactory', storeinfoLocationsIdFactory);
   function storeinfoLocationsIdFactory($resource, Configurations) {
       return $resource(Configurations.Hostserver+'/loc/:locationid/:ldesc/:lemail/:laddr', {},{ 'update': { method:'PUT' }});
    };
})();                                                                                    