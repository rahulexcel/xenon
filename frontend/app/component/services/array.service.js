(function () {
    'use strict';
    angular.module('xenon-frontend')
            .factory('arrayService', arrayService);
    function arrayService(currencySymbol) {
        var service = {};

        service.getArrayService = function (data) {
            var Send_Array = [];
            var obj = {'name': 'View all', 'id': 1};
            var obj1 = {'name': 'Others', 'id': 2};
            Send_Array.push(obj);

            for (var i = 0; i < data.length; i++) {
                obj = {
                    'name': data[i].catname,
                    'id': data[i].catproducts
                }
                Send_Array.push(obj);
            }

            // //console.log(Send_Array);
            return Send_Array;
        }
        service.getProduct = function (response_products, category) {
            console.log(response_products);
            console.log(category);
            var Send_Array = [];
            for (var i = 0; i < response_products.length; i++) {
                for (var k = 0; k < category.length; k++) {
                    if (category[k] == response_products[i]._id) {
                        Send_Array.push(response_products[i]);
                    }
                }
            }
            console.log(Send_Array);
            return Send_Array;
        }
        service.getPhoneNo = function (fullPhoneNo) {
            var phoneNo;
            for (var i = 0; i < fullPhoneNo.length; i++) {
                if (fullPhoneNo[i] == '-') {
                    var dash = i;
                }
            }
            phoneNo = fullPhoneNo.substring(dash + 1, fullPhoneNo.length);
            // //console.log(phoneNo);
            return phoneNo;
        }
        service.showAllService = function (category, products) {
            var Send_Array = [];

            console.log(category);
            console.log(products);
            var obj = {};
           
            for (var i = 0; i < category.length; i++) {
                var arr = [];
                var arr1 = [];
                var arr2 = [];
                var arr3 = [];
                var arr4 = [];
                for (var l = 0; l < category[i].catproducts.length; l++) {
                    for (var k = 0; k < products.length; k++) {
                        if (products[k]._id == category[i].catproducts[l]) {
                            arr.push(products[k].pname);
                            arr1.push(products[k].price);
                            arr2.push(products[k].pdesc);
                            arr3.push(products[k]._id);
                            arr4.push(products[k].pimages);
                            //                       productforuncat.splice(1,k);

                        }
                    }
                }
                var prdct = [];
                for (var k = 0; k < arr.length; k++) {
                    var obj1 = {
                        'pname': arr[k],
                        'price': arr1[k],
                        'pdesc': arr2[k],
                        '_id': arr3[k],
                        'pimages': arr4[k]
                    }
                    prdct.push(obj1);
                }
                obj = {
                    'name': category[i].catname,
                    'products': prdct

                }
                Send_Array.push(obj);

            }
//            var r = [];
//            for (var i = 0; i < products.length; i++) {
//
//                if (products[i].pcatid == undefined) {
//                    r.push(products[i]);
//                    //console.log(products[i].pname);
//                }
//            }
//            var obj2 = {
//                'name': '',
//                'products': r
//            }
//            Send_Array.push(obj2);
//            console.log(Send_Array);
            return Send_Array;
        }

        service.getTotalprice = function (cart) {
            var sum = 0;
            for (var c = 0; c < cart.length; c++) {
                sum = sum + cart[c].price;
            }
////console.log(parseFloat(sum).toFixed(2));
            return parseFloat(sum).toFixed(2);
        }
        service.openingTime = function (openingTime) {
            var time = openingTime;
            var hours = Number(time.match(/^(\d+)/)[1]);
            var AMPM = time.match(/\s(.*)$/)[1];
            if (AMPM == "PM" && hours < 12)
                hours = hours + 12;
            if (AMPM == "AM" && hours == 12)
                hours = hours - 12;
            var sHours = hours.toString();
            if (hours < 10)
                sHours = "0" + sHours;
            return sHours + ':00';
        }
        service.closingTime = function (closingTime) {
            var time = closingTime;
            var hours = Number(time.match(/^(\d+)/)[1]);
            var AMPM = time.match(/\s(.*)$/)[1];
            if (AMPM == "PM" && hours < 12)
                hours = hours + 12;
            if (AMPM == "AM" && hours == 12)
                hours = hours - 12;
            var sHours = hours.toString();
            if (hours < 10)
                sHours = "0" + sHours;
            return sHours + ':00';
        }
        service.totalItemInCart = function (cartData) {
            //console.log(cartData);
            var totalItemInCart = 0;
            for (var i = 0; i < cartData.length; i++) {
                //console.log(cartData[i].count);
                totalItemInCart = totalItemInCart + cartData[i].count;
            }
            return totalItemInCart;
        }
        service.CurrencySymbol = function (data) {
            //console.log(data);
            var flag = 0;
            var symbol;
            for (var i = 0; i < currencySymbol.length; i++) {
                if (currencySymbol[i].cc == data.toLowerCase() || currencySymbol[i].cc == data.toUpperCase()) {
                    symbol = currencySymbol[i].symbol;
                    flag = 1;
                }
            }
            if (flag == 0) {
                // //console.log(data);
                return data;
            } else {
                // //console.log(symbol);
                return symbol;
            }
        }
        service.checkday = function (data) {
            console.log(data);
            var now = new Date();
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var day = days[ now.getDay() ];
            var flag = 1;
            
            

            for (var i = 0; i < data.lwots.length; i++) {

                if (data.lwots[i].day == day) {
                    flag = 0;

                }
            }
            return flag;
        }
        service.open = function (data, des) {
            console.log(data);
            var now = new Date();
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var day = days[ now.getDay() ];
            var flag;
            if (des == 1) {
                for (var i = 0; i < data.lwots.length; i++) {
                    if (data.lwots[i].day == day) {
                        flag = data.lwots[i].opening_time;

                    }
                }
            } else if (des == 2) {
                for (var i = 0; i < data.lwots.length; i++) {
                    if (data.lwots[i].day == day) {
                        flag = data.lwots[i].closing_time;

                    }
                }
            }
            if (!angular.isDefined(flag)) {
                return "00";
            }
            return flag;
        }
        service.otherProducts = function (products) {
            var r = [];
            var Send_Array = [];
            for (var i = 0; i < products.length; i++) {

                if (products[i].pcatid == undefined) {
                    r.push(products[i]);
                    //console.log(products[i].pname);
                } else {
                    console.log('abcd');
                }
            }


            console.log(Send_Array);
            return r;
        }

        return service;
    }
})();