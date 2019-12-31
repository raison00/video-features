//#MODULE - ValidationManager
//> Author: Mike Byrnes
//>
//> Create Date: 2014-03-05
//>
//##DESCRIPTION: Module to handle multiple validations
define( [ "jquery", "validation" ], function ( $, ValidationModule ) {

    //###Method - validate(value)
    //Public method to validate a field.
    //
    //> parameters
    //>
    //+ *fieldName* : *String* - the name of the field being validated
    //+ *valueToValidate* : *String* | *Object* - Value that needs to be checked.
    //+ *validators* : *Object* | *Array* - list of the validators to run in the form of object: { required: true, minCharacters: 3 } or list of validators to run in predetermined order in the form of array: [ { required: true }, { minCharacters: 3 } ] Any method from the Validation module is valid
    //
    //> returns
    //>
    //+ An array of error objects for failed validations.  Each error object contains attributes: validator, fieldName, description
    function validate( fieldName, valueToValidate, validators ) {
        var errors = [],
            isValueGood,
            hasCondition,
            isValidatorArray = $.isArray( validators ),
            requiredValidator;

        //common code for validating and populating the error
        function runFieldValidation( fieldValue, validatorName, validatorOptions ) {
            if ( !ValidationModule.validate( validatorName, fieldValue, validatorOptions ) ) {
                errors.push( {
                    validator: validatorName,
                    relatedField: $.isPlainObject( validatorOptions ) ? validatorOptions.related : undefined,
                    fieldName: fieldName,
                    description: ( "This field is " + ( ( validatorName === "required" ) ? "required." : "not valid." ) )
                } );
                //error added
                return false;
            }
            //no errors added
            return true;
        }

        //* ------------------------
        //Section: let's look for required validator
        //------------------------ */
        if ( validators ) {
            if ( isValidatorArray ) {
                //lets try find if we have a { required:true } as one of the array entries to use on next if
                requiredValidator = $.grep( validators, function ( n ) {
                    return ( n.required ? n.required : false );
                } );
                requiredValidator = ( requiredValidator.length ? requiredValidator[ 0 ].required : false );
            } else {
                if ( validators.required ) {
                    requiredValidator = validators.required;
                }
            }
        }

        if ( !validators || ( !requiredValidator && valueToValidate === '' ) ) {
            return errors;
        }

        //* ------------------------
        //Section: Validators is an Array of Objects
        //------------------------ */
        if ( isValidatorArray ) {
            //looping each array entry
            $.each( validators, function ( i, validatorObject ) {
                hasCondition = true;
                //looping each object's prop
                $.each( validatorObject, function ( validatorName, validatorOptions ) {
                    // Related Field Validation
                    // 
                    // The "related" validator is a virtual validator that is used to pre-validate other fields agains some rules.
                    // If ALL the rules return TRUE, the the field itself got validated over its own rule set.
                    //
                    // Example:
                    // cvv: [
                    //  {
                    //      related: {
                    //      name: “expirationDate”,
                    //      validators: { 
                    //          regex: /1|2|3/ //use the regex validator to match the CC value
                    //      }
                    //  },
                    //  { required: true }
                    // ]
                    // 
                    // WHERE:
                    //      name: Name of the field that will be pre-validated.
                    //      validators: Object containing all the validators to run against the "other field"
                    //
                    if ( validatorName === "related" ) {
                        // set the value as "good" by default for this case
                        isValueGood = true;

                        if ( validatorOptions.validators && $.isPlainObject( validatorOptions.validators ) ) {
                            // iterate over the conditional validators for related field to assert the condition to continue
                            $.each( validatorOptions.validators, function ( conditionValidatorName, conditionValidatorOptions ) {
                                hasCondition &= runFieldValidation( validatorOptions.value, conditionValidatorName, conditionValidatorOptions );
                            } );

                            if ( !hasCondition ) {
                                // condition for local field validation not found: stops validation
                                errors = [];

                                //return false to break out of $.each() - works like for-in's break
                                return false;
                            }
                        } else {
                            // condition for local field validation not found: stops validation
                            errors = [];

                            //return false to break out of $.each() - works like for-in's break
                            return false;
                        }
                    } else {
                        isValueGood = runFieldValidation( valueToValidate, validatorName, validatorOptions );
                        if ( !isValueGood ) {
                            //return false to break out of $.each() - works like for-in's break
                            return false;
                        }
                    }
                } );
                //return false to break out of $.each()
                //if inner $.each() is broken, break this as well
                if ( !isValueGood ) {
                    return false;
                } else if ( !hasCondition ) {
                    // no condition found to continue validating the field (related validator)
                    return false;
                }
            } );
        } else {
            //* ------------------------
            //Section: Validators is an Object
            //------------------------ */
            $.each( validators, function ( validatorName, validatorOptions ) {
                isValueGood = runFieldValidation( valueToValidate, validatorName, validatorOptions );
                if ( !isValueGood ) {
                    //return false inside each() is the same as for-in's break
                    return false;
                }
            } );
        }
        return errors;
    }

    return {
        validate: validate
    };
} );
