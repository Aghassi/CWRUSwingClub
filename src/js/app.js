var app = angular.module('swingclub', ['ngRoute']);

app.controller('RouteController', ['$scope', '$route', '$routeParams', '$location', function($scope, $route, $routeParams, $location){
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
    //Setup the gallery - justified
    $(document).ready(function () {
        jQuery("#gallery").nanoGallery({
            kind:'picasa',
            userID:'cwruswing@gmail.com',
            album:'6144618759687328673',
            thumbnailWidth: 'auto',

            paginationMaxLinesPerPage: 4,

            theme: 'clean',
            galleryToolbarHideIcons: true,
            thumbnailHoverEffect: 'imageScale150',
            thumbnailLabel: {
                display: false,
                displayDescription: false,
                hideIcons: true,
            },
            thumbnailGutterWidth: 5,
            thumbnailGutterHeight: 5
        });
    });
}]);
app.controller('SparxController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams){
    $rootScope.name = 'SparX 2015';
    $rootScope.title = 'SparX';
    $scope.$routeParams = $routeParams;
    //Setup the gallery - paginated
    $(document).ready(function () {
        jQuery("#sparx").nanoGallery({
            kind:'picasa',
            userID:'cwruswing@gmail.com',
            album:'6135497289919570833',
            thumbnailWidth: '101',

            paginationMaxLinesPerPage: 4,

            theme: 'clean',
            galleryToolbarHideIcons: true,
            thumbnailHoverEffect: 'imageScale150',
            thumbnailLabel: {
                display: false,
                displayDescription: false,
                hideIcons: true,
            },
            thumbnailGutterWidth: 5,
            thumbnailGutterHeight: 5
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
        })
        .when('/nanogallery/gallery/6144618759687328673', {
            templateUrl: 'pages/gallery.html',
            controller: 'GalleryController',
        })
        .when('/media/sparx-gallery.html', {
            templateUrl: 'pages/sparx-gallery.html',
            controller: 'SparxController',
        })
        //Reload nano gallery
        //Number is the cwruswing account id
        .when('/nanogallery/sparx/6135497289919570833', {
            templateUrl: 'pages/sparx-gallery.html',
            controller: 'SparxController',
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(false);
});