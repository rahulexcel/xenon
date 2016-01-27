(function() {
   'use strict';
   angular.module('xenon-frontend')
   .controller('frontendCtrl',frontendCtrl);    
   function frontendCtrl($scope, locations, locationID, category, products, arrayService){
    var response_products;
    var response_categories;
    $scope.spinner=true;
      $scope.category='View All';
  var query = locations.get({locationID: locationID.locationID});
            query.$promise.then(function(data){
              //$scope.spinner=false;
             // $scope.spinner_close=true;
              $scope.location_name=data.lname;
              $scope.location_desc=data.ldesc;
              $scope.picImage = 'http://s3.amazonaws.com/ordermagic/' + data.llogo;
              $scope.location_addr=data.laddr;
              $scope.location_lcity=data.lcity;
              $scope.location_lcountry=data.lcountry;
              $scope.location_lpostcode=data.lpostcode;
              $scope.location_lstate= data.lstate;
              $scope.location_openingtime=data.lwots[0].opening_time;
              $scope.location_closingtime=data.lwots[0].closing_time;
              $scope.all_clicked=true;
            });      
   var query1 = category.query({locationID: locationID.locationID});
            query1.$promise.then(function(data1) { 
              response_categories=data1;
              console.log(data1);
        $scope.ctegories=arrayService.getArrayService(response_categories);
            }); 
            product_api();
            function product_api(){
            var query2 = products.query({locationID: locationID.locationID});
            query2.$promise.then(function(data2) {
            response_products=data2;
            console.log(data2); 
            show_all();    
              $scope.spinner=false;
              $scope.spinner_closed=true;

            });         
            } 
function show_all(){
   
  $scope.All_products=arrayService.showAllService(response_categories, response_products);
 console.log($scope.All_products);
}


 $scope.category_selected=function(category){
  $scope.all_clicked=true;
   $scope.category_clicked=false;
if(category.name=='View all'){
show_all();
}
else{
   $scope.all_clicked=false;
   $scope.category_clicked=true;
  $scope.category=category.name;
  product_api();
  $scope.products=arrayService.getProduct(response_products, category.id);
  //console.log($scope.products);
}
}

$scope.selectedIndex = 0; 
  $scope.itemClicked = function ($index) {
    $scope.selectedIndex = $index;
  };
var cart_array=[];
var cart_obj={};
var i=0;
var total_price;
$scope.total_price=0;
  $scope.show_in_cart=function(selected_product){
    console.log(selected_product.pname);
    cart_obj={"name":selected_product.pname,
         "price":selected_product.price
          }    
    cart_array.push(cart_obj);
    console.log(cart_array);
    $scope.cart=cart_array;
    $scope.total_price=$scope.total_price+cart_array[i].price;
    i=i+1;
     console.log(total_price);
  }


  }
})();