/*!
* Portfolio
*
* Copyright (c) Skyberry Studio&trade;
* www.skyberrystudio.com
*
* Author        Daniel Williams
*/
var portfolio = function ($) {
    function start() {
        var $portfolio = $("#portfolio"),
            $filters = $("ul.sub > li"),
            $subfilters = $(".sub-filters select", $portfolio),
            $subtitle = $(".subtitle", $portfolio),
            $grid = $("div.grid", $portfolio),
            $mode = $(".mode", $portfolio),
            filters = {},
            images = {},
            imageSets = {},
            accolades = {},
            testimonials = {},
            filter = "All",
            imagesIndex = 0,
            imagesShowning = 0,
            addImages = 6,
            imageId = null,
            showInfo = false,
            onMouseOver = function () {
                $(this).parent().find(".item_overlay").fadeIn(100);
            },
            onMouseOut = function () {
                $(this).parent().find(".item_overlay").fadeOut(100);
            },
            onClick = function () {
                imageID = $(this).parent().data("imageId");
                var q = { id: imageID }
                $.post("/portfolio/imageset", $.toJSON(q), function (data) {
                    imageSetIdx = 0;
                    imageSet = data.Images;
                    accolades = data.Accolades;
                    testimonials = data.Testimonials;
                    $.modal($("#tmpl-image-set").html(), { onOpen: imageSetOpen, onClose: imageSetClose, opacity: 70 });
                })
            },
            imageSetOpen = function (dialog) {
                $imageSet = $("#image-set")
                    .find(".icon-close").click(function () { $.modal.close(); }).end()
                    .find(".prev").click(imageSetPrev).end()
                    .find(".next").click(imageSetNext).end();

                if (imageSet.length > 1) {
                    $imageSet.find(".next").removeClass("disabled").end();
                }
                imageSetUpdate();
                if (accolades.length > 0) {
                    var $accolades = $imageSet.find(".accolades"),
                        text = "";
                    for (i = 0; i < accolades.length; i++) {
                        text += "<p>" + accolades[i].Description + "</p>";
                    }
                    $accolades.show().find(".val").html(text);
                }
                if (testimonials.length > 0) {
                    var $testimonials = $imageSet.find(".testimonials"),
                        text = "";
                    for (i = 0; i < testimonials.length; i++) {
                        text += "<p>" + testimonials[i].Description + "</p>";
                    }
                    $testimonials.show().find(".val").html(text);
                }
                dialog.container.show();
                dialog.overlay.fadeIn(200, function () {
                    dialog.data.fadeIn(200);
                });
            },
            imageSetClose = function (dialog) {
                dialog.data.fadeOut(200, function () {
                    dialog.overlay.fadeOut(200, function () {
                        $.modal.close();
                    });
                });
            },
            imageSetPrev = function () {
                if (imageSetIdx > 0) {
                    imageSetIdx--;
                    imageSetUpdate();
                    $("#image-set .next").removeClass("disabled");
                }

                if (imageSetIdx == 0) {
                    $("#image-set .prev").addClass("disabled");
                }
            },
            imageSetNext = function () {
                if (imageSetIdx < imageSet.length - 1) {
                    imageSetIdx++;
                    imageSetUpdate();
                    $("#image-set .prev").removeClass("disabled");
                }

                if (imageSetIdx >= imageSet.length - 1) {
                    $("#image-set .next").addClass("disabled");
                }
            },
            imageSetUpdate = function () {
                $imageset = $("#image-set")
                    .find(".image").attr("src", "/files/" + imageSet[imageSetIdx].Filename).end()
                    .find(".count").html("(" + (imageSetIdx + 1) + "/" + imageSet.length + ")").end()
                    .find(".detail .title").html(imageSet[imageSetIdx].Title).end()
                    .find(".detail .description").html(imageSet[imageSetIdx].Description);
            },
            getSubfilters = function () {
                var q = { parent: filter };
                $.post("/portfolio/filters", $.toJSON(q), function (data) {
                    filters = data;
                    updateSubfilters();
                });
                getImages("Featured");
            },
            updateSubfilters = function () {
                var prefix,
                    g1Num = 0,
                    g2Num = 0,
                    g1Opts = '',
                    g2Opts = '';

                for (var i = 0; i < filters.length; i++) {
                    prefix = filters[i].substring(0, 4);
                    if (prefix === "  - ") {
                        g1Num++;
                        g1Opts += '<option value="' + filters[i] + '">' + filters[i].substring(4) + '</option>';
                    } else {
                        g2Num++;
                        g2Opts += '<option value="' + filters[i] + '">' + filters[i] + '</option>';
                    }
                }

                var opts = '<option value="Featured" selected="selected" class="pop">Featured</option>';
                //opts += '<option value="All" class="pop">Everything</option>';
                if (g1Num > 0) {
                    opts += '<optgroup label="Category">' + g1Opts + '</optgroup>';
                }
                if (g2Num > 0) {
                    opts += '<optgroup label="Industry">' + g2Opts + '</optgroup>';
                }
                $subfilters.html(opts);
            },
            getImages = function (subfilter) {
                var q = { filter1: filter, filter2: subfilter };
                $.post("/portfolio/images", $.toJSON(q), function (data) {
                    images = data;
                    imagesIdx = 0;
                    showImages();
                });
            },
            showImages = function () {
                while (loadMore()) {
                    imagesShowning = $grid.children("div").length;
                    if (imagesIdx >= images.length) break;
                    var startIdx = imagesIdx,
                        endIdx = startIdx + addImages;
                    if (endIdx > images.length) {
                        endIdx = images.length;
                    }
                    for (i = startIdx; i < endIdx; i++, imagesIdx++) {
                        var $frag = $($("#tmpl-portfolio-item").html())
                            .data("imageId", images[i].DocumentId)
                            .find("img.item_img").attr("src", "/files/" + images[i].Filename).end()
                            .find(".item_frame").bind("mouseover", onMouseOver).bind("mouseleave", onMouseOut).bind("click", onClick).end()
                            .find(".item_ttl").html(images[i].Title).end()
                            .find(".item_desc").html(images[i].Description).end();
                        if (imagesIdx < imagesShowning) {
                            $($grid.children("div").get(imagesIdx)).replaceWith($frag);
                        }
                        else {
                            $grid.append($frag);
                        }
                        if (showInfo) {
                            $(".item_info").show();
                        }
                        $(".item_img", $frag).fadeIn(600);
                    }
                }
                for (i = imagesIdx; i < imagesShowning; i++) {
                    $($grid.children("div").get(imagesIdx)).fadeOut(600).remove();
                }
            },
            loadMore = function () {
                if (imagesIdx < addImages) { return true; }
                var $tgt = $($grid.children("div").get(imagesIdx - 1)),
                    offset = $tgt.offset().top + $tgt.height(),
                    vScroll = $(window).scrollTop() + $(window).height();
                return offset < vScroll;
            };

        $filters.click(function () {
            var $tgt = $(this);
            filter = $tgt.text();
            getSubfilters();
            $filters.removeClass("selected");
            $tgt.addClass("selected");
            $subtitle.text("");
            if (filter != "All") {
                $subtitle.text(" | " + $tgt.html());
            }
        });
        $subfilters.change(function () {
            getImages($(this).val());
        });
        $mode.click(function () {
            showInfo = !showInfo;
            $(".item_info").toggle(200);
            $mode.toggleClass("info");
        });
        $(window).scroll(showImages);
        getSubfilters();
    }
    return {
        start: start
    }
}(jQuery);

$(function () {
    portfolio.start();
});





