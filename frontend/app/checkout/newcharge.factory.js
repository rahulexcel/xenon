(function() {
    'use strict';
    angular.module('xenon-frontend')
            .factory('newcharge', newcharge);

    function newcharge($resource, Configurations) {
        return $resource(Configurations.Hostserver + '/newcharge/:orderid/:stripeToken/:firstname/:stripeEmail/:lastname/:addr/:postcode/:city/:countrycode/:currency/:phone/:deliverymode/:deliverytime', {}, {});
        // orderid: $localStorage.Orders_response.orderid,
        //                stripeToken: response.id,
        //                firstname: $scope.first_name,
        //                stripeEmail: $scope.stripeEmail,
        //                lastname: $scope.last_name,
        //                addr: $scope.addr,
        //                postcode: $scope.postcode,
        //                city: $scope.city,
        //                countrycode: country_code[0].dialCode,
        //                currency: $localStorage.shippingdata.currency.toLowerCase(),
        //                phone: $scope.phone_no,
        //                deliverymode: $localStorage.shippingdata.deliverymode,
        //                deliverytime: $localStorage.shippingdata.timestamp
    }
    ;
})();