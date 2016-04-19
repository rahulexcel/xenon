(function() {
    'use strict';
    angular.module('xenon-app')
            .factory('categorylistService', categorylistService);

    function categorylistService() {

        return {
            categorylist: function(catArr, productList, levelzeroproduct) {
                //console.log(catArr);
                for (var i = 0; i < catArr.length; i++) {
                    catArr[i].products = [];
                    for (var j = 0; j < catArr[i].catproducts.length; j++) {
                        var catproductId = catArr[i].catproducts[j];
                        for (var k = 0; k < productList.length; k++) {
                            var productId = productList[k]._id;
                            if (catproductId == productId) {
                               
                                catArr[i].products.push(productList[k]);
                            }
                        }
                    }
                }
               //console.log(catArr); 
               //console.log(levelzeroproduct);
               //catArr[0].products=levelzeroproduct;
               catArr[0].catname="Level 0 (No category)" 
                //console.log(catArr[0]);
                console.log(levelzeroproduct);
//                if(angular.isDefined(levelzeroproduct)){
//                var a=[];
//                //console.log(levelzeroproduct);
//                for(var i=0; i<levelzeroproduct.length; i++){
//                    a.push(levelzeroproduct[i]._id);
//                }
//                 catArr[0].catproducts=a;
//                //console.log(a);
//                //console.log(catArr);
//            }
                return catArr;
            }
        }
    }

})();