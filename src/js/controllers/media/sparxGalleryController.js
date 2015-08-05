var app = angular.module('swingclub');

app.controller('SparxController', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {
    $rootScope.name = 'SparX 2015';
    $rootScope.title = 'SparX Gallery';
    $scope.$routeParams = $routeParams;

    // Setup the gallery - paginated
    $(document).ready(function() {
        initGallery('#sparx', '6135497289919570833', '101');
    });

    initNav('.button-collapse');
    _scrollToTop();
}]);