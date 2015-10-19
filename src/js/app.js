var app = angular.module('swingclub', ['ngRoute']);

/**
 * Forces the page to scroll to the top when people navigate to different
 * parts of the website since we are a single page view
 */
var _scrollToTop = function () {
    // Always make sure we are looking at the top of the page
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
};

/**
 * Some thing in Materialize create two overlay divs, but only one is removed
 * We have to go through and remove the ones that aren't
 */
var removeOverlays = function () {
    var parent = document.getElementsByClassName('background-sparx')[0];
    var modal = document.getElementsByClassName('lean-overlay')[0];
    if (!!modal) {
        parent.removeChild(modal);
    }
};


/**
 * Makes the slide over nav activate for all pages
 * This must be called by each page controller so the sidenav works
 *
 * @param string cssClass cssClass that represents the sideNav
 * button
 */
var initNav = function (cssClass) {
    function activateSideNav (cssClass) {
        var isNotDesktop = window.innerWidth <= 992;
        $(cssClass).sideNav({
            closeOnClick: isNotDesktop
        });
        // This does nothing if collapsible doesn't exist
        $('.collapsible').collapsible();
    }

    setTimeout(function () {
        /**
         * Until materialize fixes their issue, this is what we have to do
         * They attach a jquery plugin to the navbar, and you can't remove it
         * without deleting the node. If you keep doing .sideNav() you keep attaching
         * a plugin. Eventually you end up with multiple overlays because of it.
         * Since RouteController is only called when you load the website initially,
         * it doesn't get called if you access a route directly. This means the sidenav
         * may never be activated.
         */
        var sparxPage = document.getElementsByClassName('sparx-button-collapse')[0];
        if (!!sparxPage) {
            $('.sparx-button-collapse').remove();
            $('<a></a>', {
                'href': "/",
                'data-activates': 'mobile-nav',
                'class': 'sparx-button-collapse hide-on-large-only'
            }).insertAfter('.brand-logo.center');
            $('<i></i>', {
                'class': 'mdi-navigation-menu'
            }).appendTo('.sparx-button-collapse');
            activateSideNav('.sparx-button-collapse');
        }
        else {
            $('.button-collapse').remove();
            $('<a></a>', {
                'href': "/",
                'data-activates': 'slide-out',
                'class': 'button-collapse'
            }).insertBefore('.side-nav.fixed');
            $('<i></i>', {
                'class': 'mdi-navigation-menu'
            }).appendTo('.button-collapse');
            activateSideNav('.button-collapse');
        }
    }, 100);
};

/**
 * Initializes nanoGallery widget
 * @param  string   id        id on the page
 * @param  string   albumID   album id from picasa
 * @param  int      thmbWidth Size of the thumbnail
 */
var initGallery = function (id, albumID, thmbWidth) {
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
};

/**
 * Fades in the content on the page given a css class name
 * @param  CSS Class    cssClass    Name of the class being selected
 */
var fadeInContent = function(cssClass) {
    setTimeout(function () {
        $(cssClass).each(function () {
            $(this).animate({
                'opacity': '1'
            }, 800);
        });
    }, 300);
};

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
        .when('/SparX', {
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
        .when('/sparx/pricing-tracks', {
            templateUrl: 'pages/pricing-tracks.html',
            controller: 'pricingTrackController'
        })
        .when('/sparx/venues', {
            templateUrl: 'pages/venues.html',
            controller: 'venuesController'
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
