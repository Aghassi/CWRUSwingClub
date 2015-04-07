var app = angular.module('swingclub', ['ngRoute']);

app.controller('RouteController', ['$scope', '$route', '$routeParams', '$location', 
    function($scope, $route, $routeParams, $location){
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}]);

app.controller('IndexController', ['$scope', '$rootScope', '$routeParams', '$timeout', function($scope, $rootScope, $routeParams, $timeout){
    $rootScope.name = 'CWRU Swing Club'; //Page name in browser bar
    $rootScope.title = '';  //Title of the page at the top
    $scope.$routeParams = $routeParams;
    $timeout(function() {
        $('.parallax').parallax();
    }, 10);
}]);
app.controller('AboutController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams){
    $rootScope.name = 'About';
    $rootScope.title = 'About';
    $scope.$routeParams = $routeParams;
}]);
app.controller('OverviewController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams){
    $rootScope.name = 'Overview';
    $rootScope.title = 'Overview';
    $scope.$routeParams = $routeParams;
}]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'IndexController',
        })
        .when('/about.html', {
            templateUrl: 'pages/about.html',
            controller: 'AboutController',
        })
        .when('/Overview.html', {
            templateUrl: 'pages/Overview.html',
            controller: 'OverviewController',
        });

    $locationProvider.html5Mode(false);
});