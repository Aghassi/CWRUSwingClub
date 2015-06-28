var app = angular.module('swingclub', ['ngRoute']);

var _scrollToTop = function() {
    // Always make sure we are looking at the top of the page
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
}

var initSparxNav = function() {
    setTimeout(function() {
        $('.sparx-collapse-button').sideNav();
    }, 500);
}

app.controller('RouteController', ['$scope', '$route', '$routeParams', '$location', function($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}]);

//Handles the main landing page
app.controller('IndexController', ['$scope', '$rootScope', '$routeParams', '$timeout', function($scope, $rootScope, $routeParams, $timeout) {
    $rootScope.name = ''; // Title of the page at the top
    $rootScope.title = 'CWRU Swing Club'; // Page name in browser bar
    $scope.$routeParams = $routeParams;
    $timeout(function() {
        $('.parallax').parallax();
    }, 10);

    _scrollToTop();
}]);

app.controller('AboutController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {
    $rootScope.name = 'About';
    $rootScope.title = 'About';
    $scope.$routeParams = $routeParams;

    _scrollToTop();
}]);
app.controller('OverviewController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {
    $rootScope.name = 'Overview';
    $rootScope.title = 'Overview';
    $scope.$routeParams = $routeParams;

    _scrollToTop();
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

    _scrollToTop();
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

    _scrollToTop();
}]);

app.controller('SparXLandingController', ['$scope', '$rootScope', '$routeParams', '$timeout', '$http', function($scope, $rootScope, $routeParams, $timeout, $http) {
    $rootScope.title = 'SparX'; // Page name in browser bar
    $scope.$routeParams = $routeParams;

    $http.get("json/headshots.json").success(function(data) {
        $scope.headshots = data;
        // So we give the DOM a second to load the data
        setTimeout(function() {
            $('.modal-trigger').leanModal();
        }, 500);
    });

    initSparxNav();
    _scrollToTop();

}]);

app.controller('InstructorsController', ['$scope', '$rootScope', '$routeParams', '$timeout', '$http', function($scope, $rootScope, $routeParams, $timeout, $http) {
    $rootScope.title = 'SparX'; // Page name in browser bar
    $scope.$routeParams = $routeParams;

    $http.get("json/instructors.json").success(function(data) {
        $scope.teachers = data;
    });

    // We always want to see one card so the user doesn't think the page didn't load
    setTimeout(function() {
        $('.bobby-kate').animate({
            'opacity': '1'
        }, 800);
    }, 100);

    // Fades in the divs of the teachers overview as you scroll
    var animateOnScroll = function() {
        /* Every time the window is scrolled ... */
        $(window).scroll(function() {

            /* Check the location of each desired element */
            $('.instructor-card').each(function(i) {

                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = $(window).scrollTop() + $(window).height();

                /* If the object is completely visible in the window, fade it it */
                if (1.35 * bottom_of_window > bottom_of_object) {

                    $(this).animate({
                        'opacity': '1'
                    }, 800);

                }

            });

        });
    }


    // Slide in on scroll
    var options = [{
        selector: '#teacher-list',
        offset: 800,
        callback: animateOnScroll()
    }];
    Materialize.scrollFire(options);

    initSparxNav();
    _scrollToTop()
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
        .when('/sparx/:instructors', {
            templateUrl: 'pages/instructors.html',
            controller: 'InstructorsController'
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
    $locationProvider.html5Mode(false);
});
