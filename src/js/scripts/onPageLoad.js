//Self invoking anonymous function
(function() {
    $('.main-nav').on('load', function() {
        //Initialize any material related things
        $('.button-collapse').sideNav();
        $('.collapsible').collapsible();
    });
})();
