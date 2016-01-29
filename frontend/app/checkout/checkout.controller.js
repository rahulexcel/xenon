(function() {
    'use strict';
    angular.module('xenon-frontend')
        .controller('checkoutCtrl', checkoutCtrl);
    function checkoutCtrl(validate, $scope, timeStorage, existingcharge, customercard, $localStorage, putCustomer, cauth, newcharge, arrayService, locations, cauthreq, locationID) {
        validate.order_placed();
        $scope.data_recevied = true;
        $scope.order_not_success = true;
        $scope.orderid = $localStorage.Orders_response.orderid;
        console.log($localStorage.Orders_response.orderid);
        $scope.cart = $localStorage.Orders_sent;
        $scope.total_price = arrayService.getTotalprice($scope.cart);
        $scope.currency = $localStorage.shippingdata.currency;
        $scope.shipping_method = $localStorage.shippingdata.methodName;
        $scope.shipping_time = $localStorage.shippingdata.shipping_time;
        var on_load_response;
        var existing_customer;
        var smscode_response;
        var customer_id;
        var customer_token;
        $scope.smscode="12";
        var query = locations.get({
            locationID: locationID.locationID
        });
        query.$promise.then(function(data) {
            console.log(data);
            on_load_response = data;
            $scope.city = data.lcity;
            $scope.currency = data.lcurrency;
            $scope.location_name = data.lname;
            $scope.location_desc = data.ldesc;
            $scope.picImage = 'http://s3.amazonaws.com/ordermagic/' + data.llogo;
            $scope.location_addr = data.laddr;
            $scope.location_lcity = data.lcity;
            $scope.location_lcountry = data.lcountry;
            $scope.location_lpostcode = data.lpostcode;
            $scope.location_lstate = data.lstate;
            $scope.location_lphone = arrayService.getPhoneNo(data.lphone);
            $scope.location_openingtime = data.lwots[0].opening_time;
            $scope.location_closingtime = data.lwots[0].closing_time;
            $scope.data_recevied = false;
        });
        $scope.phone_no_submitted = function() {

            if (angular.isDefined($scope.phone_no)) {
                $scope.phone_spinner = true;
                var country_code = angular.element($("#mobile-number").intlTelInput("getSelectedCountryData"));
                console.log(country_code[0].name);
                $scope.country = country_code[0].name;
                console.log(country_code[0].dialCode);
                var query2 = cauthreq.save({
                    phone: $scope.phone_no,
                    countrycode: country_code[0].dialCode
                });
                query2.$promise.then(function(response) {
                    existing_customer = response.customer;
                    if (response.customer === true) {
                        // $scope.updatebutton = true;
                    }
                    console.log(response);
                    $scope.phone_spinner = false;
                    if (response.customer === false) {
                        verify_delivery_mode();
                        $scope.existing_card=true;

                    } else {
                      $scope.smscode="";
                       $scope.existing_card_show_cvc = true;
                        $scope.show_sms_code_enter = true;
                        timeStorage.set('token', 1, 0.01);
                    }
                });
            }
        }

       
        $scope.sms_code_submitted = function() {
            var country_code = angular.element($("#mobile-number").intlTelInput("getSelectedCountryData"));
            console.log($scope.smscode);
            $scope.codespinner = true;
            var smscodesubmittion = cauth.save({
                countrycode: country_code[0].dialCode,
                smscode: $scope.smscode,
                phone: $scope.phone_no
            });
            smscodesubmittion.$promise.then(function(response) {
                customer_id = response.customerid;
                customer_token = response.token;
                timeStorage.set('token', customer_token, 1);
                console.log(customer_token);
                console.log(response);
                if (response.smscode == false) {
                    $scope.code_error = response.data;
                } else {
                    $scope.first_name = response.firstname,
                    $scope.last_name = response.lastname,
                    $scope.postcode = response.postcode,
                    $scope.addr = response.address,
                    $scope.cc_month = response.card_exp_month;
                    $scope.cc_year = response.card_exp_year;
                    $scope.cardnumber = "xxxx" + " " + "xxxx" + " " + "xxxx" + " " + "xxxx" + " " + response.card_last4;
                    $scope.stripeEmail = response.email;
                    $scope.fullname = response.firstname + " " + response.lastname;
                    smscode_response=response;
                    verify_delivery_mode();
                }

                $scope.codespinner = false;
                console.log(response);
            });

        }
         function verify_delivery_mode() {
            if ($localStorage.shippingdata.deliverymode === 1) {
                $scope.payment_details_form = true;
            } else {
                $scope.delivery_details_form = true;
                $scope.payment_details_form = true;
                // $scope.existing_card_show_cvc = true;
            }
        }
        $scope.newcharge = function() {
            $scope.payment_spinner = true;
            console.log(smscode_response);
            console.log($scope.payment_errors);
            $('#payment-form').submit(function(event) {
              // alert();
                var $form = $(this);
                $scope.payment_spinner = false;
                // Disable the submit button to prevent repeated clicks
                $form.find('button').prop('disabled', false);
                Stripe.card.createToken($form, stripeResponseHandler);
                // Prevent the form from submitting with the default action
                return false;
            });
        }

        function stripeResponseHandler(status, response) {
            var $form = $('#payment-form');
            $scope.new = false;
            if (response.error) {
                $scope.payment_spinner = false;
                // Show the errors on the form
                $form.find('.payment-errors').text(response.error.message);
                $form.find('button').prop('disabled', false);

            } else {
                console.log(response.id);
                console.log($localStorage.shippingdata.currency.toLowerCase());
                var country_code = angular.element($("#mobile-number").intlTelInput("getSelectedCountryData"));
                if (existing_customer === true) {
                              update_customer();
                           }
                   // $scope.updatebutton = true;
                else {
                    var query3 = newcharge.save({
                        orderid: $localStorage.Orders_response.orderid,
                        stripeToken: response.id,
                        firstname: $scope.first_name,
                        stripeEmail: $scope.stripeEmail,
                        lastname: $scope.last_name,
                        addr: $scope.addr,
                        postcode: $scope.postcode,
                        city: $scope.city,
                        countrycode: country_code[0].dialCode,
                        currency: $localStorage.shippingdata.currency.toLowerCase(),
                        phone: $scope.phone_no,
                        deliverymode: $localStorage.shippingdata.deliverymode,
                        deliverytime:$localStorage.shippingdata.timestamp
                    });
                    query3.$promise.then(function(response) {
                        console.log(response);
                        if (response.paid === true) {
                            $scope.order_not_success = false;
                            $scope.success_message = true;
                            $localStorage.$reset();
                             $scope.payment_spinner = false;
                        }else{
                        $scope.payment_spinner = false;
                      }
                    });


                }

                // response contains id and card, which contains additional card details
                var token = response.id;
                // Insert the token into the form so it gets submitted to the server
                $form.append($('<input type="hidden" name="stripeToken" />').val(token));
                // and submit
                console.log(token);
                
            }
        }

       function update_customer(){
        var updateCustomer =  putCustomer.update({},{
                                       customerid:customer_id,
                                       //token:customer_token,
                                       orderid:$localStorage.Orders_response.orderid,
                                        // stripeToken:response.id,
                                        firstname: $scope.first_name,
                                        stripeEmail:$scope.stripeEmail,
                                        lastname: $scope.last_name,
                                        addr: $scope.addr,
                                        postcode: $scope.postcode,
                                        city:$scope.city,
                                        countrycode:country_code[0].dialCode,
                                        currency:$localStorage.shippingdata.currency.toLowerCase(),
                                        phone:$scope.phone_no,
                                        deliverymode:$localStorage.shippingdata.deliverymode
                                          });
                             updateCustomer.$promise.then(function(response) { 
                                  console.log(response);
                                  if(response.paid===true){
                                    $scope.order_not_success=false;
                                    $scope.success_message=true;
                                    $localStorage.$reset();
                                  }
                                  $scope.payment_spinner=false;
                             });

       }

        $scope.names_found = function() {
            $scope.fullname = $scope.first_name + ' ' + $scope.last_name;
        }
         var newcardflag=0;
        $scope.user_is_adding_new_card = function() {
            $scope.existing_card_show_cvc = false;
            $scope.newcard = true;
            newcardflag=1;

        }
        $scope.existingcharge=function(){
            // updatecustomer();
            var country_code = angular.element($("#mobile-number").intlTelInput("getSelectedCountryData"));
           var savedcard = existingcharge.save({
                        customerid: customer_id, 
                        orderid: $localStorage.Orders_response.orderid
                      
                    });
                    savedcard.$promise.then(function(response) {
                        console.log(response);
                          update_customer();
                        $scope.payment_spinner = false;
                    });
    

        }
           
       $scope.cardnew=function(){
          var customerCard =  customercard.update({},{
                                        customerid: customer_id, 
                                        object: "card",
                                        exp_month: $scope.cc_monthnew,
                                        exp_year: $scope.cc_yearnew,
                                        number: $scope.newcardnumber,
                                        cvc: $scope.CVCnew
                                          });
                             customerCard.$promise.then(function(response) { 
                                  console.log(response);
                                    update_customer();
                                
                             });
       }
    }
})();