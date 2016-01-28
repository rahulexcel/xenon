(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('storeinfoLocationsIdFactory', storeinfoLocationsIdFactory);

    function storeinfoLocationsIdFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/loc/:locationid', {
            'locationid': '@locationid'
        }, {
            'get': {
                method: 'GET',
                params: {
                    lname: '@lname',
                    ldesc: '@ldesc',
                    lemail: '@lemail',
                    llgo: '@llgo',
                    ladd: '@ladd',
                    lpostcode: '@lpostcode',
                    lcity: '@lcity',
                    lcountry: '@lcountry',
                    lphone: '@lphone',
                    llt: '@llt',
                    lmessage: '@lmessage',
                    lopentime: '@lopentime',
                    lclosetime: '@lclosetime'
                }
            },
            'update':{
                method:'PUT',
                params: {
                    lname: '@lname',
                    ldesc: '@ldesc',
                    lemail: '@lemail',
                    llgo: '@llgo',
                    ladd: '@ladd',
                    lpostcode: '@lpostcode',
                    lcity: '@lcity',
                    lcountry: '@lcountry',
                    lphone: '@lphone',
                    llt: '@llt',
                    lmessage: '@lmessage',
                    lopentime: '@lopentime',
                    lclosetime: '@lclosetime'
                }
            }

        });

    };
})();