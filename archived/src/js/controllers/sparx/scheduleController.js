var app = angular.module('swingclub');

app.controller('ScheduleController', [
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

            $http.get("json/schedule-track-descriptions.json").success(function(data) {
                $scope.descriptions = angular.fromJson(data);
            });

            $http.get("json/schedule-lessons.json").success(function(data) {
                $scope.days = angular.fromJson(data);
            });

            $http.get("json/schedule-dances.json").success(function(data) {
                $scope.dances = angular.fromJson(data);
            });

            initNav('.sparx-button-collapse');
            fadeInContent('.card');
            _scrollToTop();
}]);