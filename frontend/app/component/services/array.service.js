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
           for(var i=0; i<data.length; i++){
             obj={
                'name':data[i].catname, 
                'id':data[i].catproducts
            }
            Send_Array.push(obj);
            }
           
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
           
          for(var i=0; i<category.length; i++){
            var arr=[];
            var arr1=[];
             for(var k=0; k<products.length; k++){
             if(products[k].pcatid==category[i]._id){
                arr.push(products[k].pname);
                arr1.push(products[k].price);

             
                }
            }
            var prdct=[];
            for (var k=0;k<arr.length;k++){
              var obj1={
                'pname':arr[k],
                'price':arr1[k]
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
        
        return service;
    }
})();