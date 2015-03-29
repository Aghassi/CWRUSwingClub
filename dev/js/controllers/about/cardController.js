var about = angular.module('swingclub');

about.controller("cardController", function($scope, $http){
    $http.get("../../../json/about-cards.json").success(function(links){
        $scope.data = data;
    });
});