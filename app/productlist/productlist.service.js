(function() {
   'use strict';
   angular.module('xenon-app')
       .factory('productlistService', productlistService);

   function productlistService() {

       return {
           productlist: function(catArr, data1) {
                var idArr = [];
                var newArray = [];
                 for(var i=0; i<catArr.length; i++){
                    //console.log(catArr[i].products);
                    if(catArr[i].products && catArr[i].products.length > 0){
                        for(var j=0; j < catArr[i].products.length; j++){
                       // console.log(catArr[i].products[j]._id);
                        var catProductId = catArr[i].products[j]._id;
                        idArr.push(catProductId);
                        }
                    }
                 }
                 var ar=[];var r=0;
                 //console.log(idArr);
                 for(var k=0; k<data1.length;k++){
                    //console.log(data1[k]._id);
                    var flag;
                    for(var l=0; l<idArr.length;l++){
                      //console.log(idArr[l]);
                      ar[k]=true;
                      if(data1[k]._id == idArr[l]){
                        console.log('match');
                        ar[k]=false;
                        r=r+1;
                        break;
                      } 
                    }
                 }
                 for(var p=0;p<data1.length;p++)
                 {
                  if(ar[p]==true)
                  {
                    newArray.push(data1[p]);
                  }
                 }
                 console.log(newArray.length);
                 if(newArray.length == 0 && r ==0){
                  return data1;
                 } else{
                  return newArray;
                 }
                 // console.log(data1);
           }
       }
   }

})();