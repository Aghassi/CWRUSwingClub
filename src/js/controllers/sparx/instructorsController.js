var app = angular.module('swingclub');

app.controller('InstructorsController', ['$scope', '$rootScope', '$routeParams', '$timeout', '$http', function($scope, $rootScope, $routeParams, $timeout, $http) {
    $rootScope.title = 'SparX'; // Page name in browser bar
    $scope.$routeParams = $routeParams;

    $http.get("json/instructors.json").success(function(data) {
        $scope.teachers = angular.fromJson(data);
    });

    // We always want to see one card so the user doesn't think the page didn't load
    fadeInContent('.instructor-card');

    initSparxNav();
    _scrollToTop()
}]);
