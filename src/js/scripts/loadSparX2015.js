$(document).ready(function () {
    $("#gallery").nanoGallery({
        kind:'picasa',
        userID:'cwruswing',
        albums:'6135497289919570833',
        thumbnailWidth: 200,
        thumbnailHeight: 175,

         paginationMaxLinesPerPage: 3,

        thumbnailHoverEffect: 'labelSlideUp,borderLighter',
        thumbnailLabel: {display: true, align: 'center'},
        theme: 'clean',
    });
});