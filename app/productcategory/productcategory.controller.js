//  angular.module('xenon-app').controller('categoryController', function($scope) {
//   $scope.treeOptions = {
//     accept: function(sourceNodeScope, destNodesScope, destIndex) {
//       return true;
//     },
//   };
// });
(function() {
   'use strict';
angular.module('xenon-app').
controller('categoryController', categoryController);
	function categoryController($scope)	
	{
	
    $scope.nodes=[11,12,34,45,56,6,554,564564,65564564];
     // here you define the events in a treeOptions collection
       $scope.treeOptions = {
            accept: function(sourceNodeScope, destNodesScope, destIndex) {
                return true;
            },
            dropped: function(e) {
                
            }
        };

   

		
	}
})();