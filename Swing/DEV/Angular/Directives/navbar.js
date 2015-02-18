angular.module("SparX", [])
.controller('toggleController', function($scope) {
      $scope.toggle = "toggled";

      // default class
      $scope.checkToggled = function(){
        if($scope.toggle !== "toggled"){
          $scope.toggle = "toggled";
        }
        else{
          $scope.toggle = " ";
        }     
      };

    })
.directive("navbar", function() { 
  return {     
    templateUrl: "/Swing/DEV/Angular/templates/navigation-template.html"
  };
});
