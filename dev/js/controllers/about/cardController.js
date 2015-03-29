var about = angular.module('swingclub');

about.controller("cardController", function($scope, $http){
    $http.get("../../../json/about-cards.json").success(function(data){
        $scope.cards = data;
        $scope.urls = data.urls
    });
});