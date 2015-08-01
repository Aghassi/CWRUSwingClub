var app = angular.module('swingclub');

app.controller('OverviewController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {
    $rootScope.title = 'Overview';
    $scope.$routeParams = $routeParams;

    _scrollToTop();
}]);