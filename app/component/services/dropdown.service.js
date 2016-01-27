(function() {
    'use strict';
    angular.module('xenon-frontend')
        .factory('dropdownService', dropdownService);
    function dropdownService() {
        var service = {};
        service.Daydropdown = function() {
            var Daydropdown=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            return Daydropdown;
        }
        service.Timedropdown = function(){
           var hour = [];
            // var current=new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
                   var current=new Date().getHours();
                
                  var time;
                 for (var i = current+1; i <=23 ; i++) {
                         time=i+':'+'00';
                         hour.push(time);     
                      //console.log("found");
                }
                hour.push('00:00');
             
   // }
   console.log(hour);
    console.log(current);
    
    //   // var ampm=current.substring(colon+4, colon+6);
    //   // var current_hour=current.substring(0, colon)
    //    console.log(ampm);
    //    var C_H=parseInt(current_hour);
    //   if(ampm==="AM"){

    //      for (var i = C_H+1; i <= 12; i++) {
    //             hour.push(i + ':'+ "00" +" " +'AM');
    //            }

    //             for (var k = 1; k <= 12; k++) {
    //            hour.push(k + ':'+ "00" +" " +'PM');
    //            }
    //   }else{
        
    //     //console.log(parseInt(current_hour)+1);
    //       for (var k = C_H+1; k <= 12; k++) {
    //            hour.push(k + ':'+ "00" +" " +'PM');
    //            }
    //       for (var i = 1; i <= 12; i++) {
    //             hour.push(i + ':'+ "00" +" " +'AM');
    //            }

              
     // }



              
           
               return hour;
        }
         service.Selected = function(llt){
            console.log(llt);
         
               var current=new Date().getHours();
                 
       // return current+llt;     
    
   // console.log(current);
       //var ampm=current.substring(colon+4, colon+6)
    
      //console.log(ampm);
      //var selected_time=current.substring(0, colon)+":"+llt+" "+ampm;
     //
          console.log(current+":"+llt);
       return current+":"+llt;
        }
         service.delivery_method = function(){
              var method = ['Delivery', "Pickup"];
            
               return method;
        }

        

        return service;
    }
})();