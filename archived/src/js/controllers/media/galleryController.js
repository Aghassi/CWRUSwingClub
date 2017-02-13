var app = angular.module('swingclub');

app.controller('GalleryController', 
    ['$scope', 
    '$rootScope', 
    '$routeParams', 
    function(
        $scope, 
        $rootScope, 
        $routeParams) {
        $rootScope.title = 'Gallery';
        $scope.$routeParams = $routeParams;
        // Setup the gallery - justified
        $(document).ready(function() {
            initGallery('#gallery', '6144618759687328673', 'auto');
        });
        
        initNav('.button-collapse');
        _scrollToTop();
}]);