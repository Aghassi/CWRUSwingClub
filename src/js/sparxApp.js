var app = angular.module('sparx', ['ngRoute']);

app.controller('RouteController', ['$scope', '$route', '$routeParams', '$location', function($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}]);

app.controller('LandingController', ['$scope', '$rootScope', '$routeParams', '$timeout', '$http', function($scope, $rootScope, $routeParams, $timeout, $http) {
    $rootScope.title = 'SparX'; // Page name in browser bar
    $scope.$routeParams = $routeParams;

    $http.get("../json/headshots.json").success(function(data) {
        $scope.headshots = data;
    });

    // Always make sure we are looking at the top of the page
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
}]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/sparx-landing-page.html',
            controller: 'LandingController',
        })
        .otherwise({
            redirectTo: '/'
        });

    // Leave this false so people can access pages without having
    // to go to cwru.edu/swingclub first.
    $locationProvider.html5Mode(false);
});
