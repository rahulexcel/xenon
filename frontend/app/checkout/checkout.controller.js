(function() {
    'use strict';
    angular.module('xenon-frontend')
        .controller('checkoutCtrl', checkoutCtrl);
    function checkoutCtrl(validate, $scope, $rootScope, timeStorage, existingcharge, customercard, $localStorage, putCustomer, cauth, newcharge, arrayService, locations, cauthreq, locationID) {
        validate.order_placed();
        $scope.location_desc_part2_show = false;
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
        var smscode_response = false;
        var customer_id;
        var customer_token;
        var query = locations.get({
            locationID: locationID.locationID
        });
        query.$promise.then(function(data) {
            console.log(data);
            on_load_response = data;
            $scope.city = data.lcity;
            $scope.currency = data.lcurrency;
            $scope.location_name = data.lname;
            console.log(data.ldesc.split(' ').length);
            if (data.ldesc.split(' ').length > 20) {
                $scope.location_desc_part1 = data.ldesc.substring(0, 80);
                $scope.location_desc_part2 = data.ldesc.substring(80, data.ldesc.length);
            } else {
                $scope.location_desc_part1 = data.ldesc;
                $scope.location_desc_part2_show = true;
            }
            $scope.picImage = 'http://s3.amazonaws.com/ordermagic/' + data.llogo;
            $scope.location_addr = data.laddr;
            $scope.location_lcity = data.lcity;
            $scope.location_lcountry = data.lcountry;
            $scope.location_lpostcode = data.lpostcode;
            $scope.location_lstate = data.lstate;
            $scope.location_lphone = arrayService.getPhoneNo(data.lphone);
            $scope.location_openingtime = arrayService.openingTime(data.lwots[0].opening_time);
            $scope.location_closingtime = arrayService.closingTime(data.lwots[0].closing_time);
            $scope.data_recevied = false;
        });
        $scope.phone_no_submitted = function() {
            $scope.phone_error="";
            $scope.delivery_details_disabled_form=false;
            $scope.delivery_details_form=false;
            $scope.payment_details_form=false;
            $scope.existing_card_show_cvc=false;
            $scope.newcard=false;
            $scope.show_sms_code_enter=false;
            $scope.submitBackgroundCol = '#d3d3d3';
            $scope.submitBorderCol = '#d3d3d3';
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
                    if(response.error===true){
                   $scope.phone_error="Invalid contact number";     
                    }
                    if (response.customer === true) {
                         $scope.smscode = "";
                        $scope.existing_card_show_cvc = true;
                        $scope.show_sms_code_enter = true;
                        $scope.existing_card=false;
                        $scope.newcard=false;
                    }
                    console.log(response);
                    $scope.phone_spinner = false;
                    if (response.customer === false) {
                        verify_delivery_mode();
                        $scope.existing_card = true;
                        $scope.existing_card_show_cvc=false;
                        $scope.newcard=false;

                    } 
                
                });
            }
        }
        $scope.sms_code_submitted = function() {
            $scope.verifyBackgroundCol = '#d3d3d3';
            $scope.verifyBorderCol = '#d3d3d3';
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
                $localStorage.smstoken = response.token;
                $localStorage.smstoken1 = response.token;
                console.log(customer_token);
                console.log(response);
                if (response.smscode == false) {
                    $scope.code_error = response.data;
                } else {
                    $scope.dis_first_name = response.firstname,
                    $scope.dis_last_name = response.lastname,
                    $scope.dis_postcode = response.postcode,
                    $scope.dis_addr = response.streetaddr,
                    $scope.existingexpmonth = response.card_exp_month;
                    $scope.existingcc_yearnew = response.card_exp_year;
                    $scope.existingcardnumber = "xxxx" + " " + "xxxx" + " " + "xxxx" + " " + "xxxx" + " " + response.card_last4;
                    $scope.dis_email = response.email;
                    $scope.existingfullname = response.firstname + " " + response.lastname;
                    smscode_response = response.smscode;
                      $scope.show_sms_code_enter = false;
                    verify_delivery_mode();
                }
                $scope.codespinner = false;
                console.log(response);
            });
        }
        function verify_delivery_mode() {
            if ($localStorage.shippingdata.deliverymode === 1) {
                $scope.button_when_pickup_mode=true;
                $scope.button_when_delivery_mode=false;
                $scope.payment_details_form = true;
                if (jQuery.browser.mobile) {
                    $scope.payment_details_form = false;
                    $scope.payment_by_mobile = true;
                }
            } else {
                 $scope.button_when_pickup_mode=false;
                $scope.button_when_delivery_mode=true;

                if (smscode_response == true) {
                    $scope.delivery_details_disabled_form = true;
                    $scope.delivery_details_form=false;
                } else {
                    $scope.delivery_details_form = true;
                     $scope.delivery_details_disabled_form = false;
                }

                $scope.payment_details_form = true;
                if (jQuery.browser.mobile) {
                    $scope.payment_details_form = false;
                    $scope.payment_by_mobile = true;
                }
            }
        }
        $scope.edit_customer_information = function() {
            $scope.delivery_details_disabled_form = false;
            $scope.delivery_details_form = true;
            if ($scope.delivery_details_form === true) {
                $scope.update_button = true;
            }
        }
        $scope.update_customer_information = function() {
            $scope.update_spinner = true;
            console.log($localStorage.smstoken1);
            var country_code = angular.element($("#mobile-number").intlTelInput("getSelectedCountryData"));
            var updateCustomer = putCustomer.update($localStorage.smstoken1).query({}, {
                customerid: customer_id,
                firstname: $scope.first_name,
                email: $scope.stripeEmail,
                lastname: $scope.last_name,
                streetaddr: $scope.addr,
                postcode: $scope.postcode
            });
            $rootScope.smstoken = $localStorage.smstoken;
            updateCustomer.$promise.then(function(response) {
                console.log(response);
                $scope.update_spinner = false;
            });
        }
        var $form;
        jQuery(function($) {
            $('#payment-form').submit(function(event) {
                $form = $(this);
                $form.find('#spinner_on_error').css("display","inline-block");  
                $form.find('.payment-errors').text(" ");
                $form.find('button').prop('disabled', true);
                Stripe.card.createToken($form, stripeResponseHandler);
                return false;
            });
        });
        $scope.newcharge = function() { 
            $scope.new_charge_spinner=true;
            // $scope.payment_spinner_new_charge = true;
        }
        $scope.cardnew = function() {
            $scope.payment_spinner = true;
            var customerCard = customercard.update($localStorage.smstoken1).query({}, {
                customerid: customer_id,
                exp_month: $scope.cc_monthnew,
                exp_year: $scope.cc_yearnew,
                number: $scope.newcardnumber,
                cvc: $scope.CVCnew
            });
            customerCard.$promise.then(function(response) {
                $scope.payment_spinner = false;
                 if(response.updated===true){
                    $scope.newcard_update_button=false;
                    $scope.new_card_submit_button=true;
                 }
            
            });
        }
        
        function stripeResponseHandler(status, response) {
            if (response.error) {
              
                $form.find('.payment-errors').text(response.error.message);
                $form.find('button').prop('disabled', false);
                $form.find('#spinner_on_error').css("display","none");
            } else {
                console.log(response.id);
                console.log($localStorage.shippingdata.currency.toLowerCase());
                if (existing_customer === true) {
                    existinguser(response);
                }
                // $scope.updatebutton = true;
                else {
                    newuser(response);
                }
                var token = response.id;
                $form.append($('<input type="hidden" name="stripeToken" />').val(token));
                console.log(token);
            }
        }
        $scope.names_found = function() {
            $scope.fullname = $scope.first_name + ' ' + $scope.last_name;
        }
        var newcardflag = 0;
        $scope.user_is_adding_new_card = function() {
            $scope.existing_card_show_cvc = false;
            $scope.existing_card=false;
            $scope.newcard = true;
            $scope.newcard_update_button=true;
            newcardflag = 1;
        }
        $scope.existingcharge = function() {
            $scope.payment_spinner=true;
            var country_code = angular.element($("#mobile-number").intlTelInput("getSelectedCountryData"));
            var savedcard = existingcharge.save({
                customerid: customer_id,
                orderid: $localStorage.Orders_response.orderid
            });
            savedcard.$promise.then(function(response) {
                console.log(response);
                after_payment(response);
                $scope.payment_spinner = false;
            });
        }
        function newuser(response) {

            var country_code = angular.element($("#mobile-number").intlTelInput("getSelectedCountryData"));
        if ($localStorage.shippingdata.deliverymode === 2) {
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
                deliverytime: $localStorage.shippingdata.timestamp
            });
            query3.$promise.then(function(response) {
                after_payment(response);
            });
        }
        if($localStorage.shippingdata.deliverymode === 1){
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
                pickuptime: $localStorage.shippingdata.timestamp
            });
            query3.$promise.then(function(response) {
                after_payment(response);
            });
        }
        }   
        $scope.changeBackgrounfColor = function() {
            console.log('changeBackgrounfColor');
        }
        function after_payment(response) {
            if (response.paid === true) {
                $scope.orderNo = $localStorage.Orders_response.orderid;
                $scope.order_not_success = false;
                $scope.success_message = true;
                $localStorage.$reset();
                $scope.payment_spinner = false;
            } else {
                $scope.payment_spinner = false;
            }
        }
        $scope.pay_by_new_card=function(){
           $scope.pay_by_new_card_spinner=true;
            var country_code = angular.element($("#mobile-number").intlTelInput("getSelectedCountryData"));
            var savedcard = existingcharge.save({
                customerid: customer_id,
                orderid: $localStorage.Orders_response.orderid
            });
            savedcard.$promise.then(function(response) {
                console.log(response);
                after_payment(response);
                 $scope.pay_by_new_card_spinner=false;
            });
        }
    var handler = StripeCheckout.configure({
    key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
    // image: '/img/pay.png',
    locale: 'auto',
    token: function(response) {
      console.log(response);
      verifyCustomer(response);
      // Use the token to create the charge with a server-side script.
      // You can access the token ID with `token.id`
    }
  });

  $('#mobilePaymentButton').on('click', function(e) {
    // Open Checkout with further options
    handler.open({
      name: 'Xenon',
      description: '2 widgets',
      amount: 2000
    });
    e.preventDefault();
  });

  // Close Checkout on page navigation
  $(window).on('popstate', function() {
    handler.close();
  });
  function verifyCustomer(response){
    if (existing_customer === true) {
                    var country_code = angular.element($("#mobile-number").intlTelInput("getSelectedCountryData"));
                    var savedcard = existingcharge.save({
                        customerid: customer_id,
                        orderid: $localStorage.Orders_response.orderid
                    });
                    savedcard.$promise.then(function(response) {
                        console.log(response);
                        after_payment(response);
                    });
                }
                else {
                    newuser(response);
                }
  }


    }
})();