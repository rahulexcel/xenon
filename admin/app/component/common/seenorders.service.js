(function() {
    'use strict';
    angular
        .module('xenon-app')
        .factory('seenOrderService',seenOrderService);
    function seenOrderService($q, $localStorage) {
        return {
            seenOrder: function(orderId) {
                if(!$localStorage.seenOrdersIds)
        {
            $localStorage.seenOrdersIds=[];
        }
        var flag=false;
        var len=$localStorage.seenOrdersIds.length;
            if(len==0)
            {
                $localStorage.seenOrdersIds.push(orderId);
            }
            else
            {
                for(var i=0;i<len;i++)
                { 
                    if($localStorage.seenOrdersIds[i]==orderId)
                    {
                        flag=true;
                    }
                }
                if(flag == false)
                {
                    $localStorage.seenOrdersIds.push(orderId);
                }
            }
                
            },
            newOrderList: function(orderListData){
                var def = $q.defer();
                if($localStorage.seenOrdersIds){
                    var seenOrdersIds = $localStorage.seenOrdersIds;
                    for(var i=0; i<orderListData.length;i++){
                        for(var j =0; j<seenOrdersIds.length;j++){
                            if(orderListData[i]._id == seenOrdersIds[j]){
                                orderListData[i].seen= true; 
                                break;                            
                            } else{
                                orderListData[i].seen= false;
                            }
                        }
                    }
                } else{
                    for(var i=0; i<orderListData.length;i++){
                        orderListData[i].seen= false;
                    }
                }
                def.resolve(orderListData);
                return def.promise;
            }
        };
    }

})();