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
            //console.log(Send_Array);
            return Send_Array;
        }
        service.getProduct = function(response_products, category) {
          //console.log(category);
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
           for(var i=0; i<category.length; i++){
            console.log(category[i]._id);
           }
          for(var i=0; i<products.length; i++){
            if(category[i]._id==products[i].id){
          console.log(products[i].pname);  
      }
          }
          console.log(products);
         //  var Send_Array=[];
         //  for(var i=0; i<response_products.length; i++){
         //    for(var k=0; k< category.length; k++){
         //        if(category[k]==response_products[i]._id){
         //           Send_Array.push(response_products[i]);
         //        }
         //    }
         //  }
         // return Send_Array;
        }
        return service;
    }
})();