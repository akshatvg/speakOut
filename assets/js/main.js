(function ($) {
    "use strict";

    // Loader
    $(function () {
        var loader = function () {
            setTimeout(function () {
                if ($('#loader').length > 0) {
                    $('#loader').removeClass('show');
                }
            }, 1000);
        };
        loader();
    });

    // Auto Init 
    M.AutoInit();

    // Carousel
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });

    $('i#prev').click(function () {
        $('.carousel').carousel('prev');
    });

    $('i#next').click(function () {
        $('.carousel').carousel('next');
    });

    // Video Call Controls
    $("#mic-btn").prop("disabled", true);
    $("#video-btn").prop("disabled", true);
    $("#screen-share-btn").prop("disabled", true);
    $("#exit-btn").prop("disabled", true);

})(jQuery);