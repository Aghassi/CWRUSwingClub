var app = angular.module('swingclub', ['ngRoute']);

app.controller('RouteController', ['$scope', '$route', '$routeParams', 'location', function($scope, $route, $routeParams, $location){
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}]);

app.controller('IndexController', ['$scope', '$routeScope', '$routeParams', function($scope, $routeScope, $routeParams){
    $routeScope.name = 'CWRU Swing Club';
    $scope.$routeParams = $routeParams;
}]);
app.controller('AboutController', ['$scope', '$routeScope', '$routeParams', function($scope, $routeScope, $routeParams){
    $routeScope.name = 'About';
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
        });

    $locationProvider.html5Mode(true);
});