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

})(jQuery);

console.clear();