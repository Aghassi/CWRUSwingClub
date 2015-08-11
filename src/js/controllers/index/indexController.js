var app = angular.module('swingclub');

//Handles the main landing page
app.controller('IndexController', 
    ['$scope', 
    '$rootScope', 
    '$routeParams', 
    '$timeout', 
    function(
        $scope, 
        $rootScope, 
        $routeParams, 
        $timeout) {
            $rootScope.title = 'CWRU Swing Club'; // Page name in browser bar
            $scope.$routeParams = $routeParams;
            $timeout(function() {
                $('.parallax').parallax();
            }, 10);
            
            initNav('.button-collapse');
            _scrollToTop();
}]);