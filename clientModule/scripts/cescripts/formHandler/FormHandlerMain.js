//#MODULE - FormHandlerMain
//> Author: Kristine Lai + Lochan Chhetri
//>
//> Create Date: January 2016
//>
//##DESCRIPTION:
//This will replace the previous version of FormHandler 
//FormHandlerMain serves as a mediator module between FormHandlerValidate and FormHandlerDisplay.
//FormHandlerValidate provides a wrapper around ValidationManager, and triggers 'form-error' and 'form-valid' events. 
//FormHandlerMain listens for the 'form-error' and 'form-valid' events and calls the appropriate FormHandlerDisplay functions.
//FormHandlerDisplay is an API for all client-side error display functions (visual cue and errror messages).

define( [ 'jquery', 'underscore', 'require', 'formHandlerValidate', 'formHandlerDisplay' ], function ( $, _, require, FormHandlerValidate, FormHandlerDisplay ) {

    var FormHandler = function ( formId ) {

        if ( !formId ) {
            throw new Error( "Missing formId for FormHandler constructor." );
        } else if ( $( "#" + formId ).length === 0 ) {
            throw new Error( "The <form> associated with the formId does not exist in the DOM" );
        }

        this.formId = formId;
    };

    FormHandler.prototype.init = function ( config ) {

        var defaults = {
            useBlur: true,
            rules: 'formHandlerRules',
            recoveryText: 'formHandlerRecoveryTexts',
            pageLevelErrorHeader: "The following error(s) have occurred"
        };

        config = _.extend( defaults, config );

        this.fhV = new FormHandlerValidate( this.formId );
        this.fhD = new FormHandlerDisplay();

        this.fhV.init( config );
        this.fhD.init( config );

        _.bind( formEventListener, this )();

    };

    FormHandler.prototype.destroy = function () {
        $( "#" + this.formId ).off();
    };

    FormHandler.prototype.resetFields = function ( fields ) {
        var $fields = $( '#' + this.formId ).find( fields );
        this.fhV.resetFields( $fields );
        this.fhD.resetFields( $fields );
    };

    function formEventListener() {
        var _this = this;

        $( "#" + this.formId ).on( "form_error", function ( e, currentValidateField, fieldId, validator, optional ) {
            if ( !optional ) {
                _this.fhD.displayFieldError( currentValidateField, fieldId, validator );
            }
        } );

        $( "#" + this.formId ).on( "form_valid", function ( e, fieldId, optional ) {
            if ( !optional ) {
                _this.fhD.clearFieldError( fieldId );
            }
        } );

        $( '.submit' ).on( "click", function ( e ) {
            e.preventDefault();

            var pageFormErrors = _.bind( generateFormErrors, _this )();
            _this.fhD.showPageLevelErrors( pageFormErrors, _this.fhV.formData.formElement );

            // if ( _this.GLOBAL_ERROR === true ) {
            //     _this.fhD.showGlobalErrorMessage( _this.formId, _this.fhD.backendResponse );
            // }
        } );

        $( '#' + this.formId ).on( "click", ".cancel", function ( e ) {
            e.preventDefault();
            _.bind( resetForm, _this )();
        } );
    }


    function resetForm() {
        var _this = this;
        _this.fhV.formData.formLevelError = false;
        for ( var key in _this.fhV.inputData ) {
            var el = $( "#" + _this.fhV.inputData[ key ].elementId );
            if ( el.length > 0 ) {
                el.val( "" );
                _this.fhV.inputData[ key ].errors = [];
                _this.fhV.inputData[ key ].hasError = false;
                _this.fhD.clearFormErrorDisplay( el );

            }
        }
    }


    function generateFormErrors() {
        var _this = this;

        var formErrors = {
            header: _this.fhD.pageLevelErrorHeader || "",
            errors: []
        };

        _.each( _this.fhV.formErrorArray, function ( error ) {
            var errorMsg = _this.fhD.recoveryHash[ error.errorPointers[ 0 ] ][ error.errorPointers[ 1 ] ];
            formErrors.errors.push( {
                title: error.title,
                elementId: error.elementId,
                error: errorMsg
            } );
        } );
        return formErrors;
    }


    return FormHandler;

} );
