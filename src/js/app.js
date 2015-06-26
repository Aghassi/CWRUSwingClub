var app = angular.module('swingclub', ['ngRoute']);

app.controller('RouteController', ['$scope', '$route', '$routeParams', '$location', function($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}]);

app.controller('IndexController', ['$scope', '$rootScope', '$routeParams', '$timeout', function($scope, $rootScope, $routeParams, $timeout) {
    $rootScope.name = ''; // Title of the page at the top
    $rootScope.title = 'CWRU Swing Club'; // Page name in browser bar
    $scope.$routeParams = $routeParams;
    $timeout(function() {
        $('.parallax').parallax();
    }, 10);

    // Always make sure we are looking at the top of the page
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
}]);

app.controller('AboutController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {
    $rootScope.name = 'About';
    $rootScope.title = 'About';
    $scope.$routeParams = $routeParams;

    $('html, body').animate({
        scrollTop: 0
    }, 'slow');

}]);
app.controller('OverviewController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {
    $rootScope.name = 'Overview';
    $rootScope.title = 'Overview';
    $scope.$routeParams = $routeParams;

    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
}]);
app.controller('GalleryController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {
    $rootScope.name = 'Gallery';
    $rootScope.title = 'Gallery';
    $scope.$routeParams = $routeParams;
    // Setup the gallery - justified
    $(document).ready(function() {
        jQuery('#gallery').nanoGallery({
            kind: 'picasa',
            userID: 'cwruswing@gmail.com',
            album: '6144618759687328673',
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

    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
}]);
app.controller('SparxController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {
    $rootScope.name = 'SparX 2015';
    $rootScope.title = 'SparX Gallery';
    $scope.$routeParams = $routeParams;

    // Setup the gallery - paginated
    $(document).ready(function() {
        jQuery('#sparx').nanoGallery({
            kind: 'picasa',
            userID: 'cwruswing@gmail.com',
            album: '6135497289919570833',
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

    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
}]);

app.controller('SparXLandingController', ['$scope', '$rootScope', '$routeParams', '$timeout', '$http', function($scope, $rootScope, $routeParams, $timeout, $http) {
    $rootScope.title = 'SparX'; // Page name in browser bar
    $scope.$routeParams = $routeParams;

    $http.get("../json/headshots.json").success(function(data) {
        $scope.headshots = data;
        // So we give the DOM a second to load the data
        setTimeout(function() {
            $('.modal-trigger').leanModal();
        }, 1500);
    });

    // Always make sure we are looking at the top of the page
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');

}]);

app.controller('InstructorsController', ['$scope', '$rootScope', '$routeParams', '$timeout', '$http', function($scope, $rootScope, $routeParams, $timeout, $http) {
    $rootScope.title = 'Instructors'; // Page name in browser bar
    $scope.$routeParams = $routeParams;

    $http.get("../json/instructors.json").success(function(data) {
        $scope.teachers = data;
    });

    // Always make sure we are looking at the top of the page
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
}]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'IndexController',
        })
        .when('/home', {
            templateUrl: 'pages/home.html',
            controller: 'IndexController',
        })
        .when('/about', {
            templateUrl: 'pages/about.html',
            controller: 'AboutController',
        })
        .when('/events/overview', {
            templateUrl: 'pages/overview.html',
            controller: 'OverviewController',
        })
        .when('/sparx', {
            templateUrl: 'pages/sparx.html',
            controller: 'SparXLandingController'
        })
        .when('/media/gallery', {
            templateUrl: 'pages/gallery.html',
            controller: 'GalleryController',
        })
        .when('/nanogallery/gallery/6144618759687328673', {
            templateUrl: 'pages/gallery.html',
            controller: 'GalleryController',
        })
        .when('/media/sparx-gallery', {
            templateUrl: 'pages/sparx-gallery.html',
            controller: 'SparxController',
        })
        // Reload nano gallery when we exit a picture
        // Number is the cwruswing account id
        .when('/nanogallery/sparx/6135497289919570833', {
            templateUrl: 'pages/sparx-gallery.html',
            controller: 'SparxController',
        })
        .otherwise({
            redirectTo: '/'
        });

    // Leave this false so people can access pages without having
    // to go to cwru.edu/swingclub first.
    $locationProvider.html5Mode(false);
});
