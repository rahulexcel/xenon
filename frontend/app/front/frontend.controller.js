(function() {
    'use strict';
    angular.module('xenon-frontend')
            .controller('frontendCtrl', frontendCtrl);

    function frontendCtrl($scope, locations, timeStorage, $window, currencySymbol, language, locationID, $localStorage, category, $rootScope, products, Order, $state, arrayService, dropdownService, timeService, $interval) {

        var response_products;
        var response_categories;
        var onRefreshData;
        $scope.spinner = true;
        $scope.location_desc_part2_show = false;
        $scope.class = "left_menu_display";
        $scope.cart_shown = "cart_not_display";
        $scope.product_menu = "product_menu_not_display";
        $scope.backCatMenu = false;
        $scope.productInCart = 0;
        $scope.cart = [];
        var llt;
        var OnpageLoadData;
        $scope.changeClassLeftMenu = function() {

            if ($scope.class === "left_menu_display") {
                $scope.class = "left_menu_not_display";
            } else {
                $scope.class = "left_menu_display";
            }
        };
        $scope.backToCatList = function() {

            $scope.class = "left_menu_display";
            $scope.product_menu = "product_menu_not_display";
            $scope.cart_shown = "cart_not_display";
            $scope.backCatMenu = false;
        }
        $scope.backToProductList = function() {
            if (catlength < 6) {
                $scope.backCatMenu = false;
            } else {
                $scope.backCatMenu = true;
            }
            // $scope.backCatMenu = true;
            $scope.backProductMenu = false;
            $scope.product_menu = "product_menu_display";
            $scope.cart_shown = "cart_not_display";
        }

        $scope.showlist = function() {
            $scope.list = !$scope.list;
        }
        $scope.category = 'View All';
        on_page_load();
        function on_page_load() {
            var query = locations.get({
                locationID: locationID.locationID
            });
            query.$promise.then(function(data) {
                timeStorage.set('frontStoreData', data, 1);
                onRefreshData = data;
                updatetime(data);
                OnpageLoadData = data;
                llt = data.llt;
                $scope.lwots = data.lwots;
                $scope.ldateclosed = data.ldateclosed;
                $scope.delivery_method = dropdownService.delivery_method(data.ldeliverymode);
                $scope.method = dropdownService.delivery_method_selected($scope.delivery_method);
                $scope.currency = data.lcurrency;
                $scope.currencysymbol = arrayService.CurrencySymbol(data.lcurrency);
                $scope.dropdown_minutes = dropdownService.minutesdropdown(data.llt);
                $scope.dropdown_days = dropdownService.Timedropdown();
                $scope.minutes = $scope.dropdown_minutes[0].toString();
                // $scope.dropdown_days.unshift(dropdownService.Selected(data.llt));
                $scope.time = dropdownService.Selected(data.llt);
                ////console.log();
                // dropdownService.Selected(data.llt);

                $scope.location_name = data.lname;
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
                $scope.location_openingtime = data.lwots[0].opening_time + ":" + "00";
                $scope.location_closingtime = data.lwots[0].closing_time + ":" + "00";
                $scope.all_clicked = true;
                $scope.storeclose = data.lclosed;
                $scope.ltaxall = data.ltaxall;
                $scope.ltax = data.ltax;

                checkoutButtonValidation();
                get_category();
                check_local_storage();
                language.get(data.lstorelang);


            });
        }

        function checkoutButtonValidation() {
            // //console.log($scope.cart.length);
            // //console.log($scope.ldateclosed);
            // //console.log($scope.lwots);

            ////console.log(weekdaysOpningClosingTime);
         
            var closedDay = timeService.closedDaysCheckoutButton($scope.ldateclosed);
            if (closedDay) {
                $scope.storeClosed = true;
            }
            if (onRefreshData.lcompleted.length < 2 || $scope.cart.length == 0 || closedDay || !$scope.storeclose || arrayService.checkday(onRefreshData)==1) {

                $scope.not_allow_checkout = true;
            } else {
                $scope.not_allow_checkout = false;
            }

        }
        function check_local_storage() {
            if (angular.isDefined($localStorage.Orders_sent)) {
                $scope.cart = $localStorage.Orders_sent;
                $scope.total_price = $localStorage.shippingdata.total_price;
                $scope.vat = $localStorage.shippingdata.vat;
                $scope.grandTotal_price = $localStorage.shippingdata.grandtotal;

            }
        }
        var catlength;
        function get_category() {
            var query1 = category.query({
                locationID: locationID.locationID
            });
            query1.$promise.then(function(data1) {
                response_categories = data1;
                catlength = data1.length;
                if (catlength < 6) {
                    $scope.class = "left_menu_not_display";
                    $scope.cart_shown = "cart_not_display";
                    $scope.product_menu = "product_menu_display";
                }
                $scope.ctegories = arrayService.getArrayService(response_categories);
                product_api();
            });
        }

        function product_api() {
            var query2 = products.query({
                locationID: locationID.locationID
            });
            query2.$promise.then(function(data2) {
                response_products = data2;
                show_all();
                $scope.spinner = false;
                $scope.spinner_closed = true;

            });
        }

        function show_all() {
            $scope.All_products = arrayService.showAllService(response_categories, response_products);
            ////console.log(response_categories);
        }


        $scope.category_selected = function(category) {
            console.log(category);
            $scope.cart_shown = "cart_not_display";
            $scope.class = "left_menu_not_display";
            $scope.product_menu = "product_menu_display";
            $scope.backCatMenu = true;
            $scope.backProductMenu = false;


            $scope.all_clicked = true;
            $scope.category_clicked = false;
            if (category.name == 'View all') {
                show_all();
            } else {
                $scope.all_clicked = false;
                $scope.category_clicked = true;
                $scope.category = category.name;
                product_api();
                $scope.products = arrayService.getProduct(response_products, category.id);
                //console.log($scope.products);
                //console.log(category.id);

            }
        }
        $scope.sidebarInMobile = true;
        if (jQuery.browser.mobile) {

            $scope.sidebarInMobile = false;
        }
        $scope.selectedIndex = 0;
        $scope.itemClicked = function($index) {
            $scope.sidebarInMobile = true;
            $scope.selectedIndex = $index;
            //$scope.cart_shown="cart_display";
        };
        var cart_array = [];
        var cart_obj = [];
        var i = 0;
        var total_price;
        $scope.total_price = 0;
        var flag = 0;
        var pr_total;
        var product_name;
        $scope.show_in_cart = function(selected_product) {
            $scope.productInCart = $scope.productInCart + 1;
            //$scope.cart_shown="cart_display";
            //$scope.product_menu = "product_menu_not_display";
            if (catlength < 6) {
                $scope.backCatMenu = false;
            } else {
                $scope.backCatMenu = true;
            }
            $scope.backProductMenu = false;
            var flag1 = 1;
            var count = 1;
            var flag = 1;
            for (var k = 0; k < cart_array.length; k++) {
                if (cart_array[k] == selected_product._id) {
                    flag1 = 0;
                }
            }
            if (flag1 == 0) {
                for (var j = 0; j < cart_array.length; j++) {
                    for (var i = 0; i < cart_obj.length; i++) {
                        if (cart_obj[i]._id == cart_array[j] && cart_obj[i]._id == selected_product._id) {

                            cart_obj[i].count++;
                            cart_obj[i].price = selected_product.price * cart_obj[i].count;
                            flag = 0;
                        }

                    }
                }
            } else {
                cart_array.push(selected_product._id);
                var obj1 = {
                    _id: selected_product._id,
                    count: 1,
                    name: selected_product.pname,
                    price: selected_product.price
                }
                cart_obj.push(obj1);
            }
            $scope.cart = cart_obj;
            methodChanged();
            checkoutButtonValidation();





        }
        function methodChanged() {
            var total = 0;



            var frontStoreData = timeStorage.get('frontStoreData');
            //console.log(frontStoreData);

            if ($scope.method == 'Delivery') {

                if (frontStoreData.ldeliveryprice) {
                    $scope.deliveryPriceTax = true;
                    $scope.deliveryPrice = frontStoreData.ldeliveryprice;
                    $scope.deliveryTax = frontStoreData.ldeliverytax;
                    $scope.total_price = arrayService.getTotalprice($scope.cart);
                    $scope.grandTotal_price = parseInt($scope.total_price) + $scope.deliveryPrice + ($scope.deliveryPrice / $scope.deliveryTax);

                }
            } else {

                $scope.deliveryPriceTax = false;
                $scope.total_price = arrayService.getTotalprice($scope.cart);
                $scope.grandTotal_price = arrayService.getTotalprice($scope.cart);
            }
            if ($scope.ltaxall == false) {
                $scope.vat = $scope.total_price * $scope.ltax / 100;
                $scope.grandTotal_price = parseInt($scope.grandTotal_price) + $scope.vat;
            }
            if ($scope.ltaxall == true) {
                $scope.vat = $scope.total_price * $scope.ltax / 100;
            }
        }
        $scope.method_change = function() {
            methodChanged();
        }

        $scope.remove_product_from_cart = function(product) {
            $scope.productInCart = $scope.productInCart - 1;

            var idx = $scope.cart.indexOf(product);

            if (product.count == 1) {
                cart_obj.splice(idx, 1);
                cart_array.splice(idx, 1);
                $scope.cart = cart_obj;

            } else {
                var price_to_minus = product.count;
                product.count = product.count - 1;
                var a = product.price / price_to_minus;
                product.price = product.price - product.price / price_to_minus;

            }
            $scope.total_price = arrayService.getTotalprice($scope.cart);
            //console.log($scope.total_price);
            methodChanged();
            checkoutButtonValidation();

        }

        $scope.sendOrder = function() {
            $scope.checkout_clicked = true;
            var mode;

            if ($scope.method === "Delivery") {

                mode = 2;
            } else {

                mode = 1;
            }

            var product_order_array = [];
            var product_order_obj = {};

            for (var i = 0; i < $scope.cart.length; i++) {
                product_order_obj = {
                    id: $scope.cart[i]._id,
                    qty: $scope.cart[i].count
                }
                product_order_array.push(product_order_obj);
            }
            //console.log($scope.comments);
            var query2 = Order.save({
                'lid': locationID.locationID,
                'products': product_order_array,
                'deliverymode': mode,
                'time': timeService.getTimestamp($scope.time, $scope.minutes),
                'total': $scope.total_price,
                'comments': $scope.comments
            });
            query2.$promise.then(function(response) {
                timeStorage.set('Orders_response', response, 1);
                timeStorage.set('Orders_sent', $scope.cart, 1);
                //  timeStorage.set('currency', $scope.currency, 1);
                // timeStorage.set('deliverymode', mode, 1);
                var data = {time: $scope.time,
                    methodName: $scope.method,
                    deliverymode: mode,
                    shipping_time: $scope.time + ":" + $scope.minutes,
                    timestamp: timeService.getTimestamp($scope.time, $scope.minutes),
                    currency: $scope.currency,
                    total_price: $scope.total_price,
                    grandtotal: $scope.grandTotal_price,
                    deliveryPriceTax: $scope.deliveryPriceTax,
                    deliveryPrice:$scope.deliveryPrice,
                    deliveryTax :$scope.deliveryTax,
                    vat: $scope.vat};
                timeStorage.set('shippingdata', data, 1);
                $state.go('checkout');
            });

        }
        $scope.clickOnCart = function() {

            $scope.cart_shown = "cart_display";
            $scope.product_menu = "product_menu_not_display";
            $scope.class = "left_menu_not_display";
            $scope.backCatMenu = false;
            $scope.backProductMenu = true;
        }

        function updatetime(data) {
            $interval(function() {

                $scope.dropdown_minutes = dropdownService.minutesdropdown(llt);
                $scope.dropdown_days = dropdownService.Timedropdown();
                $scope.minutes = $scope.dropdown_minutes[0].toString();
                $scope.time = dropdownService.Selected(llt);
            }, 300000);
        }

        $scope.hour_changing = function() {
            if ($scope.time === dropdownService.currenttime()) {

                $scope.dropdown_minutes = dropdownService.minutesdropdown(llt);
                $scope.minutes = dropdownService.selectedMinutes($scope.dropdown_minutes);

            } else {

                $scope.dropdown_minutes = dropdownService.changedMinutes();
                $scope.minutes = "00";

            }

        }


    }
})();