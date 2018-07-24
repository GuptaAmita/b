//check image height and width 1200*1200 to 7000*7000

function checkImageHeightorwidth(ctrl) {
    alert("gujjar");
    var fileUpload = $(ctrl)[0];
    //Check whether HTML5 is supported.
    if (typeof (fileUpload.files) != "undefined") {
        //Initiate the FileReader object.
        var reader = new FileReader();
        //Read the contents of Image File.
        reader.readAsDataURL(fileUpload.files[0]);
        reader.onload = function (e) {
            //Initiate the JavaScript Image object.
            var image = new Image();
            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;
            image.onload = function () {

                //Determine the Height and Width.
                var height = this.height;
                var width = this.width;
                if ((height >= 1200 && height <= 7000) && (width >= 1200 && width <= 7000)) {
                    $('.qwertyuioqwerty').remove();
                    return true;
                }
                $("#fuCoverArt").val('');
                $('.qwertyuioqwerty').remove();
                //PrintMessage(this, "Uploaded image has valid Height and Width.", "after");
                $('#fuCoverArt').after('<span class="qwertyuioqwerty" style="color:red;font-size:11px;width:100%"><p>Image size must be 1200*1200 to 7000*7000 px</p></span>');
                //alert("Uploaded image has valid Height and Width.");
                return false;
            };
        }
    } else {
        $("#fuCoverArt").val('');
        $('.qwertyuioqwerty').remove();
        $('#fuCoverArt').after('<span class="qwertyuioqwerty" style="color:red;font-size:11px;width:100%"><p>sThis browser does not support HTML5</p></span>');
        //alert("This browser does not support HTML5.");
        return false;
    }
}

// radioyo_blog, RadioYo123#

// POST DATA //
function PostData(url, jsondata, callbackfunction) {
    
    if (jsondata == '') {
        $.ajax({
            type: "POST",
            async: "true",
            contentType: "application/json",
            dataType: "json",
            url: url,
            success: function (html) {                
                if (html != null) {
                    if (html.IsSessionExpired != null) {
                        if (html.IsSessionExpired == true) {
                            window.location.href = "/Account/Login";
                            return;
                        }
                    }
                }
                eval(callbackfunction + "(" + JSON.stringify(html) + ")");
            },
            error: function (request, status, error) {
                 
            }
        });
    }
    else {
         
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: url,
            data: JSON.stringify(jsondata),
            success: function (html) {
                
                if (html != null) {
                    if (html.IsSessionExpired != null) {
                        if (html.IsSessionExpired == true) {
                            window.location.href = "/Account/Login";
                            return;
                        }
                    }
                }
                eval(callbackfunction + "(" + JSON.stringify(html) + ")");
            },
            error: function (request, status, error) {
                
            }
        });
    }
}
// CHECK VALIDATIONS FOR TEXTBOX //
function ValidateRequiredField(ctrl, ValidationMessage, ValidationPosition, defValue) {
    try {
        ClearMessage(ctrl);
        if ($(ctrl).val().trim() == '' || $(ctrl).val().trim() == defValue) {
            PrintMessage(ctrl, ValidationMessage, ValidationPosition);
            return false;
        }
        return true;

    } catch (e) {
    }
    return true;
}

function PrintMessage(ctrl, Message, ValidationPosition) {
    if (ValidationPosition == "after") {
        $('<span class="errormsg">' + Message + '</span>').insertAfter($(ctrl));
    }
    else {
        $('<span class="errormsg">' + Message + '</span>').insertBefore($(ctrl));
    }
}

function ClearMessage(ctrl) {
    $(ctrl).next('.errormsg').remove();
    $(ctrl).prev('.errormsg').remove();
    
}

function showmsg(ctrl, type, msg2) {
    $($(ctrl)).html('');
    if (type == 1) {
        cls = 'alert-success';
    }
    if (type == 2) {
        cls = 'alert-info';
    }
    else if (type == 3) {
        cls = 'alert-danger';
    }
    var msg = '<div class="alert ' + cls + ' fade in">'
    msg += '<a href="#" class="close" data-dismiss="alert">&times;</a>' + msg2 + '</div>';
    $(ctrl).append(msg);
}

function CommonDialog() {
    $("#DeleteDialog").dialog({
        autoOpen: false,
        width: 300,
        open: function (event, ui) {
            $(this).find('#lblName').text($(this).data("name"))
        }
    });
    CommonDialogButtons();
}

function CommonDialogButtons() {
    $('#btnDelCancel').click(function () {
        $("#DeleteDialog").dialog('close');
    })
}

function DeletePopup(control) {
    var idname = $(control).attr("IDName");
    var idname = idname.split(':');
    $("#deleteModal").data("id", parseInt(idname[0])).data("name", idname[1]);
    $("#lblName").text(idname[1]);
    $("#deleteModal").modal();
}

// CHECK VALIDATIONS FOR CONFIRM PASSWORD //
function CheckConfirmPassword(ctrl1, ctrl2, ValidationPosition) {
    if ($(ctrl1).val() != '' && $(ctrl2).val() != '') {
        ClearMessage(ctrl1);
        ClearMessage(ctrl2);
        if ($(ctrl1).val() != $(ctrl2).val()) {
            PrintMessage(ctrl2, 'Confirm Password Does Not Match', ValidationPosition);
            return false;
        }
    }
    return true;
}

// CHECK VALIDATIONS FOR PRICE //
function CheckDecimal(ctrl, ValidationPosition) {
    if ($(ctrl).val() != '') {
        ClearMessage(ctrl);
        var regex = /^\d{1,9}(\.\d{1,2})?$/;
        if (!regex.test($(ctrl).val())) {
            PrintMessage(ctrl, 'Invalid Price', ValidationPosition);
            return false;
        }
    }
    return true;
}

// CHECK VALIDATIONS FOR NUMBER //
function CheckNumber(ctrl, ValidationPosition) {
    if ($(ctrl).val() != '') {
        ClearMessage(ctrl);
        var regex = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/;
        if (!regex.test($(ctrl).val())) {
            PrintMessage(ctrl, 'Enter Number Only', ValidationPosition);
            return false;
        }
    }
    return true;
}

// CHECK VALIDATIONS FOR EMAIL //
function CheckEmail(ctrl, ValidationPosition) {
    if ($(ctrl).val() != '') {
        ClearMessage(ctrl);
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test($(ctrl).val())) {
            PrintMessage(ctrl, 'Invalid Email Address', ValidationPosition);
            return false;
        }
    }
    return true;
}

// CHECK VALIDATIONS FOR IMAGE //


function CheckImage(ctrl, ValidationPosition) {
    if ($(ctrl).val() != '') {
        ClearMessage(ctrl);
        var regex = /(.jpeg|.JPEG|.gif|.GIF|.png|.PNG|.jpg|.jpg)$/;
        //var regex = /^(([a-zA-Z]:)|(\\{2}\w+)\$?)(\\(\w[\w].*))+(.jpeg|.JPEG|.gif|.GIF|.png|.PNG|.jpg|.jpg)$/;
        if (!regex.test($(ctrl).val())) {
            PrintMessage(ctrl, 'Invalid Image', ValidationPosition);
            return false;
        }
    }
    return true;
}

// CHECK VALIDATIONS FOR IMAGE SIZE FIXED //
function CheckImageSize(ctrl, ValidationPosition) {
    if ($(ctrl).val() != '') {
        var _URL = window.URL || window.webkitURL;
        var file, img;
        if ((file = $(ctrl)[0].files[0])) {
            img = new Image();
            if (this.width == 150 && this.height == 300)
            {
                return true;
            }
            else
            {
                PrintMessage(ctrl, 'Image size must be 150*300 px', ValidationPosition);
                return false;
            }
            img.src = _URL.createObjectURL(file);
        }
    }
    return false;
}

// CHECK VALIDATIONS FOR IMAGE SIZE //
function CheckImageSizeRand(ctrl, ValidationPosition, wval, hval) {
    if ($(ctrl).val() != '') {
        var _URL = window.URL || window.webkitURL;
        var file, img;
        if ((file = $(ctrl)[0].files[0])) {
            img = new Image();
            if (this.width > wval && this.height > hval) {
                return true;
            }
            else {
                PrintMessage(ctrl, 'Invalid image size', ValidationPosition);
                return false;
            }
            img.src = _URL.createObjectURL(file);
        }
    }
    return false;
}

// CHECK VALIDATIONS FOR FILE TYPE //
function CheckFile(ctrl, ValidationPosition) {
    if ($(ctrl).val() != '') {
        ClearMessage(ctrl);
        var regex = /(.mp3|.mp4|.m4a)$/;
        if (!regex.test($(ctrl).val())) {
            PrintMessage(ctrl, 'Invalid File', ValidationPosition);
            return false;
        }
    }
    return true;
}

// CHECK VALIDATIONS FOR GENDER //
function CheckGender(ctrl1, ctrl2, ValidationPosition) {
    if ($(ctrl1).prop("checked") == false && $(ctrl1).prop("checked") == false) {
        ClearMessage(ctrl1);
        ClearMessage(ctrl2);
        PrintMessage(ctrl2, 'Gender Required', ValidationPosition);
        return false;
    }
    return true;
}

// CHECK VALIDATIONS FOR CHECKBOX //
function CBKValidateRequiredField(ctrl, ValidationMessage, ValidationPosition, defValue) {
    try {    
        ClearMessage(ctrl);
        if ($(ctrl).find('input[type="checkbox"]').prop('checked') == false) {
             PrintMessage(ctrl, ValidationMessage, ValidationPosition);           
            return false;
        }
        return true;

    } catch (e) {
    }
    return true;
}

// CART ITEM AND PRICE VALUE UPDATE //
function documentReadyCommon() {
    PostData('/Library/CartItemTotal', '', 'resultCartItemTotal');
    PostData('/Library/CartPriceTotal', '', 'resultCartPriceTotal');
}

function resultCartItemTotal(result) {
    if (result) {
        $("#cartitemtotal").text(result);
    }
    else {
        $("#cartitemtotal").text('0');
    }
}

function resultCartPriceTotal(result) {
    if (result) {
        $("#cartpricetotal").text(result);
    }
    else {
        $("#cartpricetotal").text('0');
    }
}