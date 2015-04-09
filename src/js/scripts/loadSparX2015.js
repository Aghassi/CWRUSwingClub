var photoswype = {
    /**
     * Makes an ajax call to picasa album to gather photos
     * Sets photos to the photoswype element in a json form
     **/
    init: function() {
        var pswpElement = document.querySelectorAll('.pswp')[0];
        var items = {};

        $.ajax({
            type: 'GET',
            url: 'https://picasaweb.google.com/data/feed/base/user/cwruswing/albumid/6135497289919570833?alt=json&kind=photo',
            success: function(data) {
                $.each(data.feed.entry, function(i, photo) {
                    var item = {};
                    item.src = photo.media$group.media$content[0].url;

                    items.push(item);
                });
            },
            dataType: 'json',
        });
    }
};
