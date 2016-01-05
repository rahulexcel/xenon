(function() {
   'use strict';
   angular.module('xenon-app')
       .factory('productlistService', productlistService);

   function productlistService() {

       return {
           productlist: function(catArr, data1) {
                var indexArr = [];
                 for(var i=0; i<catArr.length; i++){
                    //console.log(catArr[i].products);
                    if(catArr[i].products.length > 0){
                        for(var j=0; j < catArr[i].products.length; j++){
                       // console.log(catArr[i].products[j]._id);
                        var catProductId = catArr[i].products[j]._id;
                            for(var k =0; k < data1.length; k++){
                                //console.log(data1[k]._id);
                                var productId = data1[k]._id;
                                if(catProductId == productId){
                                    indexArr.push(k);
                                }                           
                            }                            
                        }
                    }
                 }
                 //console.log(indexArr);
                 var nIdx=0;
                 for(var x =0; x <indexArr.length;x++){
                    //console.log(indexArr[x]);
                    data1.splice(indexArr[x]-nIdx,1);
                    var nIdx=nIdx+1;
                 }
                 return data1;
           }
       }
   }

})();