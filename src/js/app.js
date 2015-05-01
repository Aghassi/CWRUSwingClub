var app = angular.module('swingclub', ['ngRoute']);

app.controller('RouteController', ['$scope', '$route', '$routeParams', '$location', 
    function($scope, $route, $routeParams, $location){
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}]);

app.controller('IndexController', ['$scope', '$rootScope', '$routeParams', '$timeout', function($scope, $rootScope, $routeParams, $timeout){
    $rootScope.name = '';  //Title of the page at the top
    $rootScope.title = 'CWRU Swing Club'; //Page name in browser bar
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
app.controller('GalleryController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams){
    $rootScope.name = 'Gallery';
    $rootScope.title = 'Gallery';
    $scope.$routeParams = $routeParams;
    //Setup the gallery
    $(document).ready(function () {
        $("#gallery").nanoGallery({
            kind:'picasa',
            userID:'cwruswing',
            albums:'6135497289919570833',
            thumbnailWidth: 200,
            thumbnailHeight: 175,

             paginationMaxLinesPerPage: 3,

            thumbnailHoverEffect: 'labelSlideUp,borderLighter',
            thumbnailLabel: {display: true, align: 'center'},
            theme: 'clean',
        });
    });
}]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'IndexController',
        })
        .when('/home.html', {
            templateUrl: 'pages/home.html',
            controller: 'IndexController',
        })
        .when('/about.html', {
            templateUrl: 'pages/about.html',
            controller: 'AboutController',
        })
        .when('/events/overview.html', {
            templateUrl: 'pages/overview.html',
            controller: 'OverviewController',
        })
        .when('/media/gallery.html', {
            templateUrl: 'pages/gallery.html',
            controller: 'GalleryController',
        });

    $locationProvider.html5Mode(false);
});