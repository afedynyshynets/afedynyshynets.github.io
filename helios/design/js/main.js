;
(function($, win) {
    $.fn.inViewport = function(cb) {
        return this.each(function(i, el) {
            function visPx() {
                var H = $(this).height(),
                    r = el.getBoundingClientRect(),
                    t = r.top,
                    b = r.bottom;
                return cb.call(el, Math.max(0, t > 0 ? H - t : (b < H ? b : H)));
            }
            visPx();
            $(win).on("resize scroll", $.throttle(500, visPx));
        });
    };
}(jQuery, window));

$(document).ready(function() {

    $(window).on('load', function() {
        $('.preloader').addClass('done');

        (function anim() {
            var anim = $('.anim');
            if (anim.length <= 0)
                return;
            $(".anim").each(function() {
                var $this = $(this),
                    data_anim = $this.attr('data-anim'),
                    data_delay = $this.attr('data-delay');
                $this.inViewport(function(px) {
                    if (px) {
                        $this
                            .css({
                                '-webkit-animation-delay': data_delay + 's',
                                '-moz-animation-delay': data_delay + 's',
                                'animation-delay': data_delay + 's'
                            })
                            .addClass('animate__animated ' + data_anim);
                    }
                });
            });
        }());
    })

    $(window).on("resize scroll", $.throttle(500, function() {
        if ($(window).scrollTop() > 10) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    }));

    $(document).on('click', 'a[href^="#s"]', function(event) {
        event.preventDefault();
        $('.burg-wr').removeClass('open');
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    $('.burg').on('click', function() {
        $('.burg-wr').toggleClass('open');
    });

});