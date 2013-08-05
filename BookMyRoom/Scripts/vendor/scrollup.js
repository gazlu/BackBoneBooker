(function ($) {
    $.fn.scrollUp = function (options) {

        var defaults = {
            scrollDuration: 2000,
            scrollTop: 400
        };

        var o = {};
        $.extend(o, defaults, options);

        return this.each(function () {

            $(this).click(function (event) {
                $("html, body").animate({ scrollTop: 0 }, o.scrollDuration);
                event.preventDefault();
            });

            var link = $(this);
            $(window).scroll(function () {
                if ($(window).scrollTop() > o.scrollTop) {
                    link.fadeIn();
                } else {
                    //link.hide();
                };
            });

        });


    }
})(jQuery)