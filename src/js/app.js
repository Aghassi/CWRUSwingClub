var app = angular.module('swingclub', ['ngRoute']);

var _scrollToTop = function() {
    // Always make sure we are looking at the top of the page
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
}

/**
 * Makes the slide over nav activate for the SparX Pages
 */
var initSparxNav = function() {
    setTimeout(function() {
        $('.sparx-collapse-button').sideNav({
            closeOnClick: true
        });
    }, 500);
}

/**
 * Initializes nanoGallery widget
 * @param  string   id        id on the page
 * @param  string   albumID   album id from picasa
 * @param  int      thmbWidth Size of the thumbnail
 */
var initGallery = function(id, albumID, thmbWidth) {
    jQuery(id).nanoGallery({
        kind: 'picasa',
        userID: 'cwruswing@gmail.com',
        album: albumID,
        thumbnailWidth: thmbWidth,

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
}

/**
 * Fades in the content on the page given a css class name
 * @param  CSS Class    cssClass    Name of the class being selected
 */
var fadeInContent = function(cssClass) {
    setTimeout(function() {
        $(cssClass).each(function() {
            $(this).animate({
                'opacity': '1'
            }, 800);
        });
    }, 100);
}

app.controller('RouteController', ['$scope', '$route', '$routeParams', '$location', function($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
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
        /**
         * SparX main page starts at route /sparx
         * To add or remove routes use the following notation
         * href(#sparx/:param)
         * And here use
         * .when(/sparx/:param)
         * 
         * :param is the name of the location you are passing in (eg instructors)
         */
        .when('/sparx', {
            templateUrl: 'pages/sparx.html',
            controller: 'SparXLandingController'
        })
        .when('/sparx/instructors', {
            templateUrl: 'pages/instructors.html',
            controller: 'InstructorsController'
        })
        .when('/sparx/schedule', {
            templateUrl: 'pages/schedule.html',
            controller: 'ScheduleController'
        })
        .when('/media/gallery', {
            templateUrl: 'pages/gallery.html',
            controller: 'GalleryController',
        })
        // See comment below as to why we do this
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
    // This is due to the case servers not knowing how to handling HTML5 routing
    $locationProvider.html5Mode(false);
});
