var app = angular.module('swingclub');

app.controller('AboutController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {
    $rootScope.title = 'About';
    $scope.$routeParams = $routeParams;

    _scrollToTop();
}]);