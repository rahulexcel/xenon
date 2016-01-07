(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('categoryFactory', categoryFactory);

    function categoryFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/cats/:catid', {
            'catid': '@catid'
        }, {
            'Update': {
                method: 'PUT',
                url: Configurations.Hostserver+'/cats/:catid/:catproducts',
            }
        });
    };
})();