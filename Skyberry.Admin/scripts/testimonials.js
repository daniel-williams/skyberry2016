/*!
* Testimonials
*
* Copyright (c) Skyberry Studio&trade;
* www.skyberrystudio.com
*
* Author        Daniel Williams
*/
var testimonials = (function ($)
{
    var testimonials = {},
        testimonialsIdx = 0,
        items = {},
        itemsIdx = 0,
        $target = $("#testimonials"),
        interval = 7000,
        start = function ()
        {
            $.post("/testimonials/featured", function (data) {
                testimonials = {};
                if (data !== null) {
                    testimonials = data;
                }
                initTestimonials();
            });
        },
        initTestimonials = function ()
        {
            if(testimonials.length)
            {
                var frag = "";
                for(i = 0; i < testimonials.length; i++)
                {
                    frag += "<div class='item' style='display: none;'>" + testimonials[i] + "</div>";
                }
                $target.append(frag);
            }
            items = $(".item", $target);
            nextItem();
            setInterval(nextItem, interval);
        },
        nextItem = function () {
            $(items).hide();
            $(items[itemsIdx++]).fadeIn(200);
            if(itemsIdx >= items.length)
            {
                itemsIdx = 0;
            }
        };
    return {
        start: start
    };
})(jQuery);

$(function () {
    testimonials.start();
});
