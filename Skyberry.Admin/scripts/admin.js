$(function () {
    tinymce.init({ selector: 'textarea' });

    $("input.date").datepicker({
        dateFormat: 'mm/dd/yy',
        yearRange: "-30:+1",
        changeMonth: true,
        changeYear: true,
        showStatus: true,
        highlightWeek: true,
        showAnim: "slide",
        showOptions: {
            direction: "up"
        }
    });

    $("input.date-range-start").datepicker({
        dateFormat: 'mm/dd/yy',
        yearRange: "-30:+1",
        changeMonth: true,
        changeYear: true,
        showStatus: true,
        highlightWeek: true,
        showAnim: "slide",
        showOptions: {
            direction: "up"
        },
        onClose: function (selectedDate) {
            $(".date-range-end").datepicker("option", "minDate", selectedDate);
        },
        beforeShow: function (input, inst) {
            $(".date-range-start").datepicker("option", "maxDate", $(".date-range-end").val());
        }
    });
    $("input.date-range-end").datepicker({
        dateFormat: 'mm/dd/yy',
        yearRange: "-30:+1",
        changeMonth: true,
        changeYear: true,
        showStatus: true,
        highlightWeek: true,
        showAnim: "slide",
        showOptions: {
            direction: "up"
        },
        onClose: function (selectedDate) {
            $(".date-range-start").datepicker("option", "maxDate", selectedDate);
        },
        beforeShow: function (input, inst) {
            $(".date-range-end").datepicker("option", "minDate", $(".date-range-start").val());
        }
    });

    if ($("input.date-range-current").is(':checked')) {
        $("input.date-range-end").val("");
        $("input.date-range-end").attr('disabled', 'disabled');
    }
    $("input.date-range-current").change(function () {
        if ($(this).is(':checked')) {
            $("input.date-range-end").val("");
            $("input.date-range-end").attr('disabled', 'disabled');
        }
        else {
            $("input.date-range-end").removeAttr('disabled');
        }
    });


    function sort() {
        $(".ui-multiselect-checkboxes").each(function () {
            var sorted = _.sortBy($(this).find("li"), function (item) {
                var checked = $(item).find("input").is(':checked') ? "0" : "1";
                var id = item.id;
                return checked + id;
            });
            $(this).html("").append(sorted);
        });
    }

    $("select.single").multiselect({
        header: "Select One",
        selectedText: function (numChecked, numTotal, checkedItems) {
            return $(checkedItems[0]).parent().find("span").text();
        },
        multiple: false,
        noneSelectedText: "Select option",
        //click: sort
    }).multiselectfilter();

    $("select.multiple").multiselect({
        header: "Select Many",
        selectedText: "# of # selected",
        //click: sort
    }).multiselectfilter();

    sort();
});