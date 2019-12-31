// 20160922 Hans 

//#MODULE - FormHandlerValidate
//> Author: Kristine Lai + Lochan Chhetri
//>
//> Create Date: January 2016
//>
//##DESCRIPTION:
//Supporting module for FormHandlerMain
//Validates client-side form error


// require 'require' to allow dynamically requiring of additional modules based on conditional checks
define( [ 'jquery', 'underscore', 'require', 'validationManager', 'formHandlerUtil', 'inputMask' ], function ( $, _, require, validationManager, formHandlerUtil ) {


    var FormHandlerValidate = function ( formId ) {

        // config can be passed in at instantiation
        var config = {};


        // references to the form element
        config.formElement = typeof formId === 'string' ? $( "#" + formId ) : formId;

        // formId without the # sign  (just text portion)
        config.formId = config.formElement.attr( "id" );
        config.formName = config.formElement.attr( "name" );

        config.formLevelError = false;
        config.formLevelErrorTemplate = false;

        this.onSubmitCallback = false;
        this.onSubmit = function ( cb ) {
            this.onSubmitCallback = cb;
        };

        this.onErrorCallback = false;
        this.onError = function ( cb ) {
            this.onErrorCallback = cb;
        };

        this.onCancelCallback = false;
        this.onCancel = function ( cb ) {
            this.onCancelCallback = cb;
        };

        config.rulesHash = {};

        // return these for public API:

        this.formData = config;

        //main reference to <input> or <select> elements, input type, messages(recovery, instructional), and errors
        this.inputData = {};

    }; // end of instance module


    // public methods
    FormHandlerValidate.prototype.init = function ( configObject ) {

        if ( configObject.onSubmitCallback && typeof configObject.onSubmitCallback === 'function' ) {
            this.onSubmitCallback = configObject.onSubmitCallback;
        }

        if ( configObject.onErrorCallback && typeof configObject.onErrorCallback === 'function' ) {
            this.onErrorCallback = configObject.onErrorCallback;
        }

        if ( configObject.onCancelCallback && typeof configObject.onCancelCallback === 'function' ) {
            this.onCancelCallback = configObject.onCancelCallback;
        }

        this.useBlur = configObject.useBlur;
        this.formData.rules = configObject.rules;

        _.bind( bindEvent, this )();
        _.bind( process, this )();

    };

    // FormHandlerValidate.prototype.onErrorCallback = function ( cb ) {

    // };

    FormHandlerValidate.prototype.getFormName = function () {
        return this.formData.formName;
    };

    FormHandlerValidate.prototype.getFormData = function () {
        return this.formData;
    };

    // Provided for user customization if needed
    // Reset form is currently being called from formHandlerMain by default
    FormHandlerValidate.prototype.resetForm = function () {
        var _this = this;
        _this.formData.formLevelError = false;
        for ( var key in _this.inputData ) {
            var el = $( "#" + _this.inputData[ key ].elementId );
            if ( el.length > 0 ) {
                el.val( "" );
                _this.inputData[ key ].errors = [];
                _this.inputData[ key ].hasError = false;

            }
        }
    };

    // For dynamic customization - to change validation
    FormHandlerValidate.prototype.resetFields = function ( $fields ) {
        var _this = this,
            rules = _this.formData.rulesHash;

        $fields.each( function () {
            var validateField = $( this ).data( 'validate' ),
                name = $( this ).attr( 'name' );

            _this.inputData[ name ].rules = formHandlerUtil.getNodeByName( validateField, rules );
            _this.inputData[ name ].hasError = false;
            _this.inputData[ name ].errors = [];
            _this.inputData[ name ].validateField = validateField;
            _this.inputData[ name ].optional = !_this.inputData[ name ].rules;

        } );
    };



    function checkForError( name, value ) {
        var formData = this.formData;
        var inputName = name;
        var inputData = this.inputData;
        var formErrorArray = [];

        var validateFieldHash = inputData[ inputName ].rules;
        inputData[ inputName ].hasError = false;
        for ( var validateField in validateFieldHash ) {
            var rules = _.omit( validateFieldHash[ validateField ], [ 'maskPattern' ] );

            if ( (validateField === 'passwordConfirm' || validateField === 'emailConfirm') && _.has( rules, 'equal' ) ) {
                if ( this.formData.formElement[ 0 ][ name = rules.equal ] ) {
                    rules.equal = this.formData.formElement[ 0 ][ name = rules.equal ].value;
                } else {
                    throw new Error( 'Cannot find form element with name ' + rules.equal );
                }
            }

            inputData[ inputName ].errors = validationManager.validate( inputName, value, rules );

            if ( inputData[ inputName ].errors.length > 0 ) {
                inputData[ inputName ].hasError = true;
                inputData[ inputName ].currentValidateField = validateField;
                break;
            }

        }


        if ( inputData[ inputName ].hasError ) {

            $( "#" + formData.formId ).trigger( "form_error", [ inputData[ inputName ].currentValidateField, inputData[ inputName ].elementId, inputData[ inputName ].errors[ 0 ].validator, inputData[ inputName ].optional ] );
        } else if ( inputData[ inputName ].errors.length === 0 ) {
            inputData[ inputName ].hasError = false;

            $( "#" + formData.formId ).trigger( "form_valid", [ inputData[ inputName ].elementId, inputData[ inputName ].optional ] );
        }

    }


    function bindEvent() {
        var _this = this;
        if ( this.useBlur === true ) {
            $( "input,select", this.formElement ).not( "input[type=submit]" ).each( function () {
                var el = $( this );
                var event = 'blur';

                if ( el.is('select') || el.is("input:checkbox")){
                    event = 'blur change';
                }

                
                el.on( event, function ( e ) {
                    var obj = $( e.target );
                    var name = obj.attr( "name" );
                    var inputValue = obj.val();
                     
                    if( obj.is("input:checkbox") && !obj.is("input:checkbox:checked") ){
                       inputValue = "";
                     } else if ( obj.is("input:checkbox") && obj.is("input:checkbox:checked") ) {
                       inputValue = "on";
                     }
                      
                    _this.inputData[ name ].visited = true;

                    // equivalent of checkForError( name, inputValue, this );
                    _.bind( checkForError, _this )( name, inputValue );
                } );

            } );
        }


        $( ".submit" ).on( "click", function ( e ) {
            e.preventDefault();
            if ( _.bind( formIsValid, _this )() ) {
                if ( _this.onSubmitCallback ) {
                    _this.onSubmitCallback( _this.formData.formElement );
                } else {
                    $( "#" + _this.formData.formId ).submit();
                }
            } else if ( _this.onErrorCallback ) {
                _this.onErrorCallback( _this.inputData );
            }
        } );

        $( ".cancel" ).on( "click", function ( e ) {
            e.preventDefault();
            if ( _this.onCancelCallback ) {
                _this.onCancelCallback();
            }
        } );

    }

    function formIsValid() {
        this.formErrorArray = [];
        for ( var key in this.inputData ) {
            var el = $( "#" + this.inputData[ key ].elementId );
             
             if( el.is("input:checkbox") && !el.is("input:checkbox:checked") ){
               el.val("");
             } else if ( el.is("input:checkbox") && el.is("input:checkbox:checked") ) {
               el.val("on");
             }
            
            if ( el.length > 0 ) {

                _.bind( checkForError, this )( key, el.val() );
                if ( this.inputData[ key ].hasError ) {
                    this.formData.formLevelError = true;
                    el.attr( "aria-invalid", "true" );
                    this.formErrorArray.push( {
                        title: this.inputData[ key ].title,
                        elementId: el.attr( 'id' ),
                        errorPointers: [ this.inputData[ key ].currentValidateField, this.inputData[ key ].errors[ 0 ].validator ] // validateField, validator
                    } );
                }
            }
        }

        if ( this.formErrorArray.length === 0 ) {
            this.formData.formLevelError = false;
        }

        return !this.formData.formLevelError;
    }


    // private helper methods
    //build hash table of each individual form elements, validation rules, recovery text, and instructional text
    function process() {
        var _this = this;
        require( [ _this.formData.rules ], function ( rules ) {
            _this.formData.rulesHash = rules;

            $( 'input,select', _this.formData.formElement ).not( "input[type=submit]" ).each( function () {
                var el = $( this ), // ex.  el = [input#profile_cardNumber, context: input#profile_cardNumber]
                    name = el.attr( 'name' ), // ex. name = profile.credicardnumber
                    id = formHandlerUtil.escapeId( el.attr( 'id' ) ), // ex. id = "profile_cardNumber"
                    title = el.attr( 'title' ), // ex. title = "Credit Card Number"
                    // TODO rename validateFields?
                    validateField = el.data( 'validate' );

                // build your inputData hash for the selected element 
                _this.inputData[ name ] = {
                    visited: false,
                    type: el.prop( "nodeName" ),
                    name: name,
                    title: title,
                    elementId: id,
                    rules: formHandlerUtil.getNodeByName( validateField, rules ),
                    hasError: false,
                    errors: [],
                    validateField: validateField
                };
                //convenience properties:
                _this.inputData[ name ].optional = !_this.inputData[ name ].rules;

                // mask form field 
                _.each( _this.inputData[ name ].rules, function ( rule ) {
                    if ( rule.maskPattern ) {
                        el.mask( rule.maskPattern );
                    }
                } );

            } );

        } );
    }


    return FormHandlerValidate;

} );
