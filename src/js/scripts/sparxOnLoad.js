// Self invoking anonymous function for document.ready
(function() {
    $(document).ready(function() {
        $('.year').fadeIn({
            duration: 2000,
            complete: function() {
                $('.letter').css('opacity', 0).animate({
                    opacity: 1
                }, 1000);
            },
        });
    });
})();
