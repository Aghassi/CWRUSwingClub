var content = angular.module("SparX");

content.directive("content", function() { 
  return {
    restrict: "E",         
    replace: true,         
    transclude: true,      
    templateUrl: "../content.html"
  };
});
