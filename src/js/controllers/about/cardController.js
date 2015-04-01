var about = angular.module("swingclub", []);

about.controller("cardController", ['$scope', '$http', function($scope, $http){
    $http.get("json/about-cards.json").success(function(data){
        $scope.cards = data;
    });
}]);