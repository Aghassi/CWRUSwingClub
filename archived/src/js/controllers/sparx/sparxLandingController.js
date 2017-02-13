var app = angular.module('swingclub');

app.controller('SparXLandingController',
 ['$scope',
  '$rootScope',
  '$routeParams',
  '$timeout',
  '$http', 
  function(
    $scope,
    $rootScope,
    $routeParams,
    $timeout,
    $http) {
        $rootScope.title = 'SparX'; // Page name in browser bar
        $scope.$routeParams = $routeParams;

        $http.get("json/headshots.json").success(function(data) {
            $scope.headshots = angular.fromJson(data);
        });

        $http.get("json/bands.json").success(function(data) {
            $scope.bands = data;
        });

        // So we give the DOM a second to load the data
        setTimeout(function() {
            $('.modal-trigger').leanModal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                complete: function () {
                    removeOverlays();
                }
            });
        }, 500);

        initNav('.sparx-button-collapse');
        _scrollToTop();
}]);