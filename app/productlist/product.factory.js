(function() {
    'use strict';
    angular.module('xenon-app')
        .factory('productFactory', productFactory);

    function productFactory($resource, Configurations) {
        return $resource(Configurations.Hostserver+'/prod', {},{
        	editProduct: {
                method: 'PUT',
                isArray: false,
                url: Configurations.Hostserver + '/prod/:prodId'
            },
            deleteProduct: {
                method: 'DELETE',
                isArray: false,
                url: Configurations.Hostserver + '/prod/:productId'
            }
        });
    };
})();