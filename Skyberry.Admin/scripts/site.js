$(function () {
    var burstPos = 0,
        burstRot = 1,
        $window = $(window);
    $.ajaxSetup({
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
    function scrollToSec() {
        var hash = document.location.hash.substring(1),
            sec = hash.replace("sec-", ""),
            $tgt = $("#" + sec);
        if ($tgt.length) {
            $("html, body").animate({ scrollTop: $tgt.offset().top }, 1000);
        }
        $("a[data-scroll='" + hash + "']").parent().addClass("selected");
    }
    $(".scroll").click(function (e) {
        document.location.hash = $(this).data("scroll");
        scrollToSec();
    });
    $window.scroll(function () {
        if ($window.scrollTop() > 240) {
            $("#scroll-top").fadeIn(400);
        }
        else {
            $("#scroll-top").fadeOut(400);
        }
    });
    function Shine() {
        $("#sunburst").css(Modernizr.prefixed('transform'), "rotate(" + ((burstPos++ + burstRot) % 360) + "deg)");
    }
    if (Modernizr.csstransforms) {
        setInterval(Shine, 100);
    }
    $window.load(function () {
        if (document.location.hash) {
            scrollToSec();
        }
    });
});