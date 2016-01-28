(function() {
    'use strict';
    angular.module('xenon-frontend')
        .factory('arrayService', arrayService);
    function arrayService() {
        var service = {};
        service.getArrayService = function(data) {
            var Send_Array=[];
            var obj={'name':'View all','id':1};
            Send_Array.push(obj);
           for(var i=1; i<data.length; i++){
             obj={
                'name':data[i].catname, 
                'id':data[i].catproducts
            }
            Send_Array.push(obj);
            }
         //  console.log(Send_Array);
            return Send_Array;
        }
        service.getProduct = function(response_products, category) {
       
          var Send_Array=[];
          for(var i=0; i<response_products.length; i++){
            for(var k=0; k< category.length; k++){
                if(category[k]==response_products[i]._id){
                   Send_Array.push(response_products[i]);
                }
            }
          }
         return Send_Array;
        }
        service.showAllService = function(category, products) {
            var Send_Array=[];
         
           var obj={};
           console.log(products);
          for(var i=1; i<category.length; i++){
            var arr=[];
            var arr1=[];
            var arr2=[];
            var arr3=[];
            var arr4=[];
             for(var k=0; k<products.length; k++){
             if(products[k].pcatid==category[i]._id){
                arr.push(products[k].pname);
                arr1.push(products[k].price);
                arr2.push(products[k].pdesc);
                arr3.push(products[k]._id);
                http://s3.amazonaws.com/ordermagic/{{row1.images[0]}}
                arr4.push(products[k].pimages );
             
                }
            }
            var prdct=[];
            for (var k=0;k<arr.length;k++){
              var obj1={
                'pname':arr[k],
                'price':arr1[k],
                'desc':arr2[k],
                 '_id': arr3[k],
                 'image':arr4[k]
              }
              prdct.push(obj1);
            }
            obj={
                'name': category[i].catname,
              'products':prdct
            
                }
                Send_Array.push(obj);
                
           }
           
      
console.log(Send_Array);
       
       return Send_Array;
          }
          
           service.getTotalprice = function(cart) {
              var sum=0;        
  for(var c=0; c< cart.length; c++){
    sum=sum+cart[c].price;
  }
//console.log(parseFloat(sum).toFixed(2));
return parseFloat(sum).toFixed(2);
        }
        return service;
    }
})();