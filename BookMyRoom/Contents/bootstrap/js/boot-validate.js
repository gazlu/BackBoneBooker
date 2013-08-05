(function ($) {
    $.fn.validForm = function (options) {
        var _self = this;
        var defaults = {
            valsection: ''
        };
        var _genMsg = $('#genMsg');
        var o = {};
        $.extend(o, defaults, options);

        stringTrim = function (stringToTrim) {
            return stringToTrim.replace(/^\s+|\s+$/g, "");
        }

        validationError = function (_jqInput, errMsg) {
            _jqInput.parent().parent().addClass('error');
            if (errMsg == null || errMsg == '') {
                _genMsg.html("Please fill all required Fields.");
                _genMsg.fadeIn('slow');
            } else {
                _genMsg.html(errMsg);
                _genMsg.fadeIn('slow');
                errMsg = '';
            }
        }

        var isValidForm = false;

        this.each(function () {
            var _form = $(this);
            
            if (_form.is('form')) {
                var _validationSection = _form.data('valsec');
                $(this).on('submit', function (event) {
                    event.preventDefault();
                    _form.find(':input').not('button').each(function (key, value) {
                        var _inputType = this.type;
                        var _jqInput = $(this);
                        var _controlContainer = _jqInput.parent().parent(); //cache for Control Container
                        var _helpElement = _jqInput.next(); //cache for Help Span

                        if ((_jqInput.data('req') == true || _jqInput.data('req') == "valid") && _jqInput.data('valsec') == _validationSection) {
                            if (_inputType == "text" || _inputType == "password" || _inputType == "number") {
                                var cntValue = new String(this.value);
                                this.value = stringTrim(cntValue);

                                if (stringTrim(cntValue) != "") {
                                    _controlContainer.removeClass('error');
                                    isValidForm = true;
                                } else {
                                    validationError(_jqInput, 'Please enter ' + _helpElement.html());
                                    this.focus();
                                    return false;
                                }
                            } if (this.type == "hidden") {
                                if (this.value != "") {
                                    _controlContainer.removeClass('error');
                                    isValidForm = true;
                                } else {
                                    validationError(_jqInput, 'Please enter ' + _helpElement.html());
                                }
                            } else if (this.type == "select-one") {
                                var selOptValue = new String(this.value);
                                if (selOptValue != '0' && selOptValue.length != 0) {
                                    _controlContainer.removeClass('error');
                                    isValidForm = true;
                                } else {
                                    validationError(_jqInput, 'Please select ' + _helpElement.html());
                                    this.focus();
                                    return false;
                                }
                            } else if (this.type == "select-multiple") {
                                var isMulti = this.getAttribute("multiple");
                                if (isMulti) {
                                    if (this.length > 0) {
                                        _controlContainer.removeClass('error');
                                        isValidForm = true;
                                    } else {
                                        validationError(_jqInput, 'Please choose ' + _helpElement.html());
                                        this.focus();
                                        return false;
                                    }
                                }
                            } else if (this.type == "textarea") {
                                if (this.value != "") {
                                    _controlContainer.removeClass('error');
                                    isValidForm = true;
                                } else {
                                    validationError(_jqInput, 'Please enter ' + _helpElement.html());
                                    this.focus();
                                    return false;
                                }
                            } else if (this.type == "radio") {
                                if (this.value != "") {
                                    _controlContainer.removeClass('error');
                                    isValidForm = true;
                                } else {

                                }
                            }
                        }
                    });
                    //if (AllValidData(frmVal)) {
                    //    return true;
                    //}

                    //if (setBool == "0") {
                    //    if (AllValidData(frmVal)) {
                    //        return true;
                    //    } else {
                    //        return false;
                    //    }
                    //} else {
                    //    if (AllValidData(frmVal)) {
                    //        return true;
                    //    } else {
                    //        return false;
                    //    }
                    //}
                });

                return isValidForm;
            }
        });
    }
})(jQuery)