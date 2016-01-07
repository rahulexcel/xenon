(function() {
   'use strict';
   angular.module('xenon-app')
       .factory('categorylistService', categorylistService);

   function categorylistService() {

       return {
           categorylist: function(catArr, productList) {
               for(var i =0; i <catArr.length; i++){
                    catArr[i].products=[];
                    for(var j=0; j <catArr[i].catproducts.length; j++){
                    var catproductId = catArr[i].catproducts[j];
                        for(var k =0; k < productList.length; k++){
                            var productId = productList[k]._id;
                            if(catproductId == productId){
                                // console.log('match');
                                catArr[i].products.push(productList[k]);
                            }
                        }                        
                    }
                }
                return catArr;
           }
       }
   }

})();