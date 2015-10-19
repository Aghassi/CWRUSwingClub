var app = angular.module('swingclub');

app.controller('venuesController', [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$http',
    function(
        $scope,
        $rootScope,
        $routeParams,
        $http) {
            $rootScope.title = 'SparX'; // Page name in browser bar
            $scope.$routeParams = $routeParams;

            $http.get("json/venues.json").success(function(data) {
                $scope.venues = data;
            });

            initNav('.sparx-button-collapse');
            fadeInContent('.card');
            _scrollToTop();
}]);