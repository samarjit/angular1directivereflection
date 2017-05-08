angular.module("myapp")
   .directive("card", [function(){

   	return {
   		restrict: 'E',
   		scope: {
   			width: '=',
   			height: '=',
   			title: '@',
   			message: '@',
   			bgcolor: '@'
   		},
   		templateUrl: 'card.directive.html',
   		link: function(scope, elem, attr, ctrl) {

   		}
   	}

   }]);

