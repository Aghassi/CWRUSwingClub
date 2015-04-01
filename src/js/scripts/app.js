angular.module('swingclub', ['ngRoute'])

    .controller('IndexController', ['$scope', '$route', '$routeParams', 'location', function($scope, $route, $routeParams, $location){
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
    }]);

    .controller('AboutController' ['$scope', '$routeParams', function($scope, $routeParams){
        $scope.name = 'About';
        $scope.$routeParams = $routeParams;
    }]);

    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/about.html', {
                templateUrl: 'pages/about.html',
                controller: 'AboutController',
            });

        // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode(true);
    });