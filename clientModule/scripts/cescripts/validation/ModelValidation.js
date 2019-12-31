//#MODULE - ModelValidation
//> Author: Alessandro Ribeiro
//>
//> Create Date: 2016-02-11
//>
//##DESCRIPTION: Common validation handler for models.
define( [ "jquery", "validationManager", "logger" ], function ( $, ValidationManager, Logger ) {

    function getFieldNameFromPrefix( fieldName, prefix ) {
        var fieldNameParts = fieldName.split( "." ),
            fieldNameFromPrefix;

        fieldName = fieldNameParts[ fieldNameParts.length - 1 ];

        if ( fieldName.indexOf( prefix ) === 0 ) {
            fieldNameFromPrefix = fieldName.replace( prefix, "" );
            fieldNameFromPrefix = fieldNameFromPrefix.charAt( 0 ).toLowerCase() + fieldNameFromPrefix.slice( 1 );
        } else {
            fieldNameFromPrefix = prefix + fieldName.charAt( 0 ).toUpperCase() + fieldName.slice( 1 );
        }

        fieldNameParts[ fieldNameParts.length - 1 ] = fieldNameFromPrefix;
        fieldNameFromPrefix = fieldNameParts.join( "." );

        return fieldNameFromPrefix;
    }

    function updateRelatedObject( fieldName, related, attributes ) {
        if ( !related.name && related.prefix ) {
            related.name = getFieldNameFromPrefix( fieldName, related.prefix );
        }

        if ( related.name && attributes ) {
            //We can assume related is part of the same model (and not child)
            //TODO: In case we need to be child in future, have to change the way it access the value
            related.value = attributes[ related.name ];
        } else {
            Logger.warn( "related field validators must contain either name or prefix attribute. ", related );
        }
    }

    function checkRelatedValidator( validatorOptions, attr, attributes, updatedValidators, index, validatorName ) {
        var related;

        //Copy the object and reassign related
        validatorOptions = $.extend( true, {}, validatorOptions );
        related = ( validatorName === "related" ) ? validatorOptions : validatorOptions.related;

        //Make a call to update the validator with the related field name and value
        updateRelatedObject( attr, related, attributes );
        //If the related value does not exist, make a note to remove this validator from further consideration
        if ( related.value !== undefined ) {
            updatedValidators[ index ] = {};
            updatedValidators[ index ][ validatorName ] = validatorOptions;
        }
        //Found the related field.  We can break the loop
        return false;
    }

    function updateRelatedFieldValidators( validators, attr, attributes ) {
        var updatedValidators = validators,
            related;

        //If the validators contain related field validators
        if ( validators.hasRelatedFieldValidators ) {
            updatedValidators = [];
            //Iterate over the validator array to find the ones with related fields
            $.each( validators, function ( index, validator ) {
                //Check each property in the validator options for the related attribute
                $.each( validator, function ( validatorName, validatorOptions ) {
                    // Check if it is a related validator, otherwise check if it has a related attribute
                    // OBS: related validators is used to validate another field against some criterias to check if the field
                    //      should be validated itself.
                    if ( validatorName === "related" ) {
                        return checkRelatedValidator( validatorOptions, attr, attributes, updatedValidators, index, validatorName );
                    } else {
                        //Find the related attribute
                        related = $.isPlainObject( validatorOptions ) ? validatorOptions.related : undefined;
                        //Check if related attribute exists
                        if ( related ) {
                            return checkRelatedValidator( validatorOptions, attr, attributes, updatedValidators, index, validatorName );
                        } else {
                            updatedValidators[ index ] = validator;
                        }
                    }
                } );
            } );
        }

        return updatedValidators;
    }

    //###Method - handleValidation( attributes, generalErrors, validatorsList, fieldPath ) public method
    //Method to manipulate validations of model attributes, using recursion to goes through the Object tree.
    //
    //> parameters
    //>
    //+ *attributes* {Object} | {String} - The object field of model to being validated. 
    //                                     If current property to be validated have an array with string values,
    //                                     this parameter will be some of these strings.
    //+ *validatorsList* {Array} - An object containing validators to be used with current field.
    //+ *fieldPath* {String} - A string representing the current path of field.
    //
    //> returns
    //>
    //+ An array with all error objects for failed validations.
    function handleValidation( attributes, validatorsList, fieldPath ) {
        var attribute,
            attrValidators,
            path,
            currentValue,
            generalErrors = [];


        // In case we don't have a validator list for this attribute (in case it's an object) we don't need to validate either
        if ( validatorsList ) {
            // if necessary to navigate inside the attributes
            if ( $.isPlainObject( attributes ) ) {
                for ( attribute in attributes ) {
                    path = fieldPath ? fieldPath + '.' + attribute : attribute;
                    currentValue = attributes[ attribute ];
                    attrValidators = validatorsList[ attribute ];

                    //Check for the related field validators.
                    //We need to set the fieldname and value if it exists
                    if ( $.isArray( attrValidators ) ) {
                        //Update any related field validators
                        attrValidators = updateRelatedFieldValidators( attrValidators, attribute, attributes );
                    }

                    // check if current field value is an array
                    if ( $.isArray( currentValue ) ) {
                        for ( var i = 0; i < currentValue.length; i++ ) {
                            // call handleValidation recursively for currentValue array, to navigate inside your objects/string values
                            generalErrors = generalErrors.concat( handleValidation( currentValue[ i ], attrValidators, ( path + '[' + i + ']' ) ) );
                        }
                    } else {
                        // call handleValidation recursively for currentValue object, to navigate inside your values
                        generalErrors = generalErrors.concat( handleValidation( currentValue, attrValidators, path ) );
                    }
                }
            } else {
                // required validator considers only "" as an empty value
                // lets convert null and undefined to empty string
                if ( attributes === null || attributes === undefined ) {
                    attributes = "";
                }
                // else execute validation on value of attributes param, with specific validators
                return generalErrors.concat( ValidationManager.validate( fieldPath, attributes, validatorsList ) );
            }
        }

        return generalErrors;
    }

    //###Method - validate( attributes ) public method
    //Method to validate all attributes of the model.
    //
    //> parameters
    //>
    //+ *attributes* {Object} - The attributes of the object
    //
    //> returns
    //>
    //+ An array of error objects for failed validations.  Each error object contains attributes: validator, fieldName, description
    function validate( attributes ) {
        var errors = [];

        if ( this.disableClientSideValidation ) {
            Logger.info( "Validation disabled by user settings" );
            return;
        }

        Logger.info( "Calling validation on ", this, "..." );
        errors = handleValidation( attributes, this.validators );

        //Return nothing if there are no errors
        if ( errors.length ) {
            Logger.info( "Errors: ", errors );
            return errors;
        } else {
            Logger.info( "No Errors for ", this );
            return;
        }
    }

    return {
        validate: validate
    };
} );
