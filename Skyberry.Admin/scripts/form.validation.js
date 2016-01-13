/// <reference path="jquery-1.6-vsdoc.js" />

var submit_form = false;

$(document).ready(function ()
{


    $("textarea,input:not(input[type=button],input[type=submit],button)")
    .addClass("inputInit")
    .focus(takeFocus);

    $("#form1").submit(validateForm);

    $(".fieldStatus").addClass("fieldInit");
});



function takeFocus()
{
    field = $(this);
    field.removeClass("inputValid");
    field.removeClass("inputError");

    var status = field.parent().children(".fieldStatus");
    status.removeClass("fieldValid");
    status.removeClass("fieldError");
}


function validateForm()
{
    isFormValid = true; // reset

    $("textarea.validate,input.validate,select.validate").each(validateField);

    if(isFormValid)
    {
        $("#frm_invalid").css("display", "none");

        return true;
    }
    else
    {
        $("#frm_invalid").css("display", "inline-block");

        return false;
    }
}

function validateField()
{
    field = $(this);

    try
    {
        var re; // Reqular Expression

        if(field.hasClass("required") || field.val().length > 0)
        {
            if(field.hasClass("asFirstName"))
            {
                re = new RegExp("[A-Za-z]{2,}");
                validateTextField(field, re);
            }
            else if(field.hasClass("asLastName"))
            {
                re = new RegExp("[A-Za-z]+([A-Za-z]|'|-){1,}");
                validateTextField(field, re);
            }
            else if(field.hasClass("asFullName"))
            {
                re = new RegExp("[A-Za-z]{2,}");
                validateTextField(field, re);
            }
            if(field.hasClass("asText"))
            {
                re = new RegExp("[A-Za-z]{2,}");
                validateTextField(field, re);
            }
            else if(field.hasClass("asEmail"))
            {
                re = new RegExp("\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b");
                validateTextField(field, re);
            }
            else if(field.hasClass("asZipCode"))
            {
                re = new RegExp("^\\d{5}(-\\d{4})?$");
                validateTextField(field, re);
            }
            else if(field.hasClass("asDateOfBirth"))
            {
                re = new RegExp("^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\\d\\d$");
                validateTextField(field, re);
            }
            else if(field.hasClass("asPhoneNumber"))
            {
                re = new RegExp("^(?:(?:\\+?1\\s*(?:[.-]\\s*)?)?(?:\\(\\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\\s*\\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\\s*(?:[.-]\\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\\s*(?:[.-]\\s*)?([0-9]{4})(?:\\s*(?:#|x\\.?|ext\\.?|extension)\\s*(\\d+))?$");
                validateTextField(field, re);
            }
            else if(field.hasClass("asMoney"))
            {
                re = new RegExp("^\\$?\\d{1,3}([ ,]?\\d{3})*(\\.\\d{0,2})?$");
                //re = new RegExp("^\\$?(\\d{1,3}[ ,]?)*(\\.\\d{0,2})?$");
                validateTextField(field, re);
            }
            else if(field.hasClass("asLoginUsername"))
            {
                re = new RegExp("[A-Za-z0-9*$-+?_&=!%{}/]{2,}");
                validateTextField(field, re);
            }
            else if(field.hasClass("asLoginPassword"))
            {
                re = new RegExp("[A-Za-z0-9*$-+?_&=!%{}/]{2,}");
                validateTextField(field, re);
            }
            else if(field.hasClass("asPassword"))
            {
                re = new RegExp("[A-Za-z0-9*$-+?_&=!%{}/]{7,}");
                validateTextField(field, re);
            }
            else if(field.hasClass("asPasswordConfirmed"))
            {
                var pass = $("#txt_password")[0].value;
                var confirm = $("#txt_passwordConfirmed")[0].value;

                if(pass === confirm)
                {
                    re = new RegExp("[A-Za-z0-9*$-+?_&=!%{}/]{7,}");
                }
                else
                {
                    re = null;
                }
                validateTextField(field, re);
            }
            else
            {
                re = new RegExp("");
                validateTextField(field, re);
            }
        }
        else
        {
            re = new RegExp("");
            validateTextField(field, re);
        }
    }
    catch(e) { }
}


function validateTextField(field, re)
{
    try
    {
        var fieldValue = field.val();
        var status = field.parent().children(".fieldStatus");

        if(re != null && fieldValue.match(re))
        {
            field.removeClass("inputError");
            field.addClass("inputValid");

            status.removeClass("fieldError");
            status.addClass("fieldValid");
        }
        else
        {
            isFormValid = false;

            field.removeClass("inputValid");
            field.addClass("inputError");

            status.removeClass("fieldValid");
            status.addClass("fieldError");
        }
    } catch(e) { }
}






