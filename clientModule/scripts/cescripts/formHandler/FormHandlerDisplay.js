//#MODULE - FormHandlerDisplay
//> Author: Kristine Lai + Lochan Chhetri
//>
//> Create Date: January 2016
//>
//##DESCRIPTION:
//Supporting module for FormHandlerMain
//API for client-side error display


define( [ 'jquery', 'require', 'underscore', 'formHandlerUtil' ], function ( $, require, _, formHandlerUtil ) {

    var ERROR_CUE = "error_visual_cue",
        ERROR_CLASS = "error",
        VALID_CUE = "valid_visual_cue",
        VALID_CLASS = "valid";

    var FormHandlerDisplay = function () {

    };

    FormHandlerDisplay.prototype.getDisplayObjectData = function () {
        return this;
    };

    // FormHandlerDisplay.prototype.setPageLevelHeader = function(header){
    //   $('#pageLevelErrorHeader').html(header);
    // };

    FormHandlerDisplay.prototype.init = function ( configObj ) {

        this.pageLevelErrorHeader = configObj.pageLevelErrorHeader;
        this.inputData = {};

        this.formLevelErrorTemplate = configObj.formLevelErrorTemplate || false;

        // create the formDisplayObject and its sub-objects using process()
        _.bind( process, this, configObj )();

    };

    FormHandlerDisplay.prototype.displayFieldError = function ( currentValidateField, fieldId, validator ) {
        var element = $( '#' + fieldId );
        var cue = ERROR_CUE;
        var errorMessage = this.recoveryHash[ currentValidateField ][ validator ];

        showVisualCue( element, cue );

        element.siblings( '.error_msg' ).remove();

        if(element.is('input:checkbox')){
           element.closest('.checkbox-container').append( '<small class="error_msg">' + errorMessage + '</small>' );
         } else {
           element.after( '<small class="error_msg">' + errorMessage + '</small>' );
         }
        
        element.attr( "aria-invalid", "true" );
        
    };

    FormHandlerDisplay.prototype.clearFieldError = function ( fieldId ) {
        var element = $( '#' + fieldId );
        var cue = VALID_CUE;

        showVisualCue( element, cue );

        element.siblings( '.error_msg' ).remove();
        element.attr( "aria-invalid", "false" );
    };


    FormHandlerDisplay.prototype.showPageLevelErrors = function ( formErrorsObj, formElement ) {

        var pageNotificationErrorElement = $( ".page-notification-error", formElement );
        if ( !this.formLevelErrorTemplate ) {
            require( [ 'hbsCommonTemplates/component/validation/FormLevelErrorTemplate' ], function ( formLevelErrorTemplate ) {
                pageNotificationErrorElement.html( formLevelErrorTemplate( formErrorsObj ) );
                pageNotificationErrorElement.find( "ul>li:first" ).attr( "tabindex", -1 ).focus();
                pageNotificationErrorElement.removeClass( "hide" );
            } );
        }
    };

    FormHandlerDisplay.prototype.showGlobalErrorMessage = function ( formId, backEndResponse ) {
        if ( $( '.global-error-container' ) ) {
            removeGlobalErrorMessage();
        }

        var formElement = $( '#' + formId );
        var globalErrorContainer = $( '<div class="global-error-container"></div>' );
        globalErrorContainer.insertAfter( formElement.find( '.page-notification-error' ) );

        var backendErrorArr = ( backEndResponse && backEndResponse.messages && backEndResponse.messages.errorMessages && backEndResponse.messages.errorMessages.globalMessages );
        if ( backendErrorArr ) {
            globalErrorContainer.append( '<ul>' );

            for ( var i = 0; i < backendErrorArr.length; i++ ) {
                globalErrorContainer.children( 'ul' ).append( '<li>' + '<div class="icon-ui-error-f-medium" style="display:inline-block"></div> ' + backendErrorArr[ i ].description + '<br/><small> (Service Code: ' + backendErrorArr[ i ].trackingCode + ' )</small>' + '</li>' );
            }
        }

    };

    FormHandlerDisplay.prototype.clearFormErrorDisplay = function ( fieldObj ) {
        removeVisualCue( fieldObj );
        removeErrorMessages( fieldObj );
        removePageLevelErrors();
        removeGlobalErrorMessage();
    };

    FormHandlerDisplay.prototype.resetFields = function ( $fields ) {
        var _this = this;
        $fields.each( function () {
            _this.clearFormErrorDisplay( $( this ) );
            $( this ).attr( 'aria-invalid', 'false' );
        } );
    };

    // process and create inputData object that binds each input field with its corresponding recovery and instructional messages
    function process( configObj ) {
        var _this = this;
        require( [ configObj.recoveryText ], function ( recovery ) {
            _this.recoveryHash = recovery;
        } );

    }


    function removeErrorMessages( obj ) {
        if ( !obj ) {
            $( '.error_msg' ).remove();
        } else {
            $( obj ).siblings( '.error_msg' ).remove();
        }

    }

    function removePageLevelErrors() {
        $( ".page-notification-error" ).empty();
    }

    function removeGlobalErrorMessage() {
        $( ".global-error-container" ).remove();
    }

    // visual cue (input field border color and error/validation icon display)

    function removeVisualCue( obj ) {
        if ( obj ) {
            obj.removeClass( VALID_CLASS ).removeClass( ERROR_CLASS );
            obj.closest( '.row' ).removeClass( VALID_CLASS ).removeClass( ERROR_CLASS );
            if ( obj.siblings().hasClass( "visual_cue" ) ) {
                obj.siblings( '.visual_cue' ).empty();
                obj.siblings( '.visual_cue' ).eq( 0 ).remove();
            }
        }
    }

    function showVisualCue( obj, cue ) {
        if ( cue === ERROR_CUE ) {

            obj.removeClass( VALID_CLASS ).addClass( ERROR_CLASS );
            obj.closest( '.row' ).removeClass( VALID_CLASS ).addClass( ERROR_CLASS );
            obj.siblings( ".visual_cue" ).remove();
             if(obj.is('input:checkbox')){
               obj.closest('.checkbox-container').append( '<div class="visual_cue"><div class="icon-ui-error-f-medium"></div></div>' );
             } else {
               $( '<div class="visual_cue"><div class="icon-ui-error-f-medium"></div></div>' ).insertAfter( obj );  
             }
             

        } else if ( cue === VALID_CUE ) {

            obj.removeClass( ERROR_CLASS ).addClass( VALID_CLASS );
            obj.closest( '.row' ).removeClass( ERROR_CLASS ).addClass( VALID_CLASS );
            obj.siblings( ".visual_cue" ).remove();
             if(obj.is('input:checkbox')){
               obj.closest('.checkbox-container').append( '<div class="visual_cue"><div class="icon-ui-validation-f-medium"></div></div>' );
             } else {
             $( '<div class="visual_cue"><div class="icon-ui-validation-f-medium"></div></div>' ).insertAfter( obj );  
             }
     

        }
    }


    // function getInstructions( validateField, recoveryHash ) {
    //     if ( typeof validateField !== "string" ) {
    //         return false;
    //     }
    //     var arr = validateField.split( "." );
    //     var newObj = recoveryHash;
    //     var node = formHandlerUtil.getNode( arr, newObj );
    //     if ( !node ) {
    //         return undefined;
    //     } else {
    //         return node.instructions || undefined;
    //     }
    // }


    return FormHandlerDisplay;

} );
