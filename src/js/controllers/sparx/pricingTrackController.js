var app = angular.module('swingclub');

app.controller('pricingTrackController', [
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

            $http.get("json/pricing.json").success(function(data) {
                $scope.pricing = data;
            });
            $http.get("json/track-descriptions.json").success(function(data) {
                $scope.descriptions = data;
            });

            initNav('.sparx-button-collapse');
            fadeInContent('.card');
            _scrollToTop();
}]);