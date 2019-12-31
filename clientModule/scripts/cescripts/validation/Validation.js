//#MODULE - Validation
//> Author: Sarfaraz Merchant
//> URL: http://confluence/display/WDS/Base+Validation+Library
//>
//> Create Date: <February 19, 2014>
//>
//##DESCRIPTION: Validate data
define( [], function () {

    var keys,
        methods,
        validate,
        addMethod;


    keys = {
        ALPHABETS: /^[a-zA-Z]*$/,
        ALPHA_NUMERIC: /^[a-zA-Z0-9]*$/,
        DATE: /^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}$/,
        EMAIL: /^([-0-9a-zA-Z'_\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        HAS_DIGIT: /[0-9]/,
        HAS_LOWERCASE: /[a-z]/,
        HAS_UPPERCASE: /[A-Z]/,
        NUMERIC: /^[0-9+]*$/,
        //PHONENUMBERPATTERN: /^[(]?(?![(]?(\d)\1{2}[)]?-?[(]?\1{3}[)]?-?[(]?\1{4}[)]?)[(]?(?![(]?(\d)00[)]?-?[(]?000[)]?-?[(]?0000[)]?)(?![(]?123[)]?-?[(]?456[)]?-?[(]?7890[)]?|[(]?012[)]?-?[(]?345[)]?-?[(]?6789[)]?)(\d{1})?([(]?\d{3}[)]?-?){2}\d{4}[)]?/,
        PHONENUMBERPATTERN: /^(?![(]?123[)]?-?[(]?456[)]?-?[(]?7890[)]?|[(]?012[)]?-?[(]?345[)]?-?[(]?6789[)]?)(?!\(?(\d)\1{2}\)?-?\(?\1{3}\)?-?\(?\1{4}\)?)(?!\(?(\d)00\)?-?\(?000\)?-?\(?0000\)?)(\(?\d{3}\)?-?){2}\(?\d{4}\)?/,
        POBOX: /(^(?!\d{2,3},?\s+(((p|P)(o|O)(s|S)(t|T))|((p|P)\s*(o|O)\s+)))(?!((P|p)\s?(O|o))\w*\W*\s*(?!0|o(ffice|FFICE))\w*\W*\s*((B|b)\s?(OX|ox))\s*(\d.)*)(?!((P|p)\.?(O|o)\.?([B|b]\.?)?(\s+Box)?)|(((P|p)OST|(P|p)ost)\s+Office(\s+Box)?)[\w]*))|(?:Post(?!.))|(?:Postal\sCode(?!.))/,
        US_CURRENCY: /^[$]?[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/,
        US_PHONE: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s]{0,1}[0-9]{3}[-\s]{0,1}[0-9]{4}$/,
        US_ZIP_CODE: /^\d{5}(?:[-]\d{4})?$/,
        PHONEPATTERNFORALLZEROES: /^(?!\(?000\)?-?\(?000\)?-?\(?0000\)?)/
    };

    methods = {

        //###Method - isNotEmpty(value)
        //Public method to check if passed value is empty.
        //
        //> parameters
        //>
        //+ *value* : *String* | *Object* | *Number* - Value that needs to be checked.
        //
        //> returns
        //>
        //+ A boolean. true if passed value is not empty.
        required: function ( value ) {
            var typeOfValue = ( typeof value );

            switch ( typeOfValue ) {
            case "string":
                value = value.replace( /^\s+|\s+$/g, '' );
                return value.length > 0;

            case "number":
                return true;

            case "object":
                for ( var prop in value ) {
                    if ( value.hasOwnProperty( prop ) ) {
                        return true;
                    }
                }
                return false;

            default:
                return false;
            }
        },

        //###Method - requiredSelect(value)
        //Public method to check that the passed value is not empty or not to have default value of '-1' (Used by select input types).
        //
        //> parameters
        //>
        //+ *value* : *String* | *Number* - Value that needs to be checked.
        //
        //> returns
        //>
        //+ A boolean. true if passed value is not empty or not equal to "-1" || -1.
        requiredSelect: function ( value ) {
            var typeOfValue = ( typeof value );

            switch ( typeOfValue ) {
            case "string":
                value = value.replace( /^\s+|\s+$/g, '' );
                return ( value === "-1" || value === "" ) ? false : true;

            case "number":
                return value === -1 ? false : true;

            default:
                return false;
            }
        },

        //###Method - isValidNumber(value)
        //Public method to check if passed value is a valid number.
        //
        //> parameters
        //>
        //+ *value* : *String* - Value that needs to be checked.
        //
        //> returns
        //>
        //+ A boolean. true if passed value is a valid number.
        numeric: function ( value ) {

            if ( !value ) {
                return;
            }

            return !isNaN( value );
        },
        //###Method - isAlphabets(value)
        //Public method to check if passed value contains alphabets or not for name fields
        //
        //> parameters
        //>
        //+ *value* : *String* - Value that needs to be checked.
        //
        //> returns
        //>
        //+ A boolean. true if passed value contains only alphbets
        alphabhets: function ( value ) {
            if ( !value ) {
                return;
            }
            return methods.regexMatch( value, keys.ALPHABETS );

        },
        //###Method - isValidAlphaNumeric(value)
        //Public method to check if passed value is a valid alphanumeric.
        //> This will internally call regexMatch method passing the pre-defined regex.
        //
        //> parameters
        //>
        //+ *value* : *String* - Value that needs to be checked.
        //
        //> returns
        //>
        //+ A boolean. true if passed value is a valid alphanumeric.
        alphaNumeric: function ( value ) {
            return methods.regexMatch( value, keys.ALPHA_NUMERIC );
        },

        //###Method - isValidZipCode(value)
        //Public method to check if passed value is a valid USA zipcode.
        //This will internally call regexMatch method passing the pre-defined regex.
        //
        //> parameters
        //>
        //+ *value* : *String* - Value that needs to be checked.
        //
        //> returns
        //>
        //+ A boolean. true if passed value is a valid USA zipcode.
        zipCode: function ( value ) {
            return methods.regexMatch( value, keys.US_ZIP_CODE );
        },

        //###Method - isValidEmail(value)
        //Public method to check if passed value is a email.
        //This will internally call regexMatch method passing the pre-defined regex.
        //
        //> parameters
        //>
        //+ *value* : *String* - Value that needs to be checked.
        //
        //> returns
        //>
        //+ A boolean. true if passed value is a valid email.
        email: function ( value ) {
            return methods.regexMatch( value, keys.EMAIL );
        },

        //###Method - isValidUsCurrency(value)
        //Public method to check if passed value is a valid USA currency.
        //This will internally call regexMatch method passing the pre-defined regex.
        //
        //> parameters
        //>
        //+ *value* : *String* - Value that needs to be checked.
        //
        //> returns
        //>
        //+ A boolean. true if passed value is a valid US currency.
        usCurrency: function ( value ) {
            return methods.regexMatch( value, keys.US_CURRENCY );
        },

        //###Method - hasMinLength(value)
        //Public method to check if passed value has minimum characters.
        //
        //> parameters
        //>
        //+ *value* : *String* - Value that needs to be checked.
        //+ *length* : *Number* - Number specifing minimum number of characters
        //
        //> returns
        //>
        //+ A boolean. true if passed value has minimum number of characters.
        minLength: function ( value, length ) {
            if ( typeof length === 'string' ) {
                length = Number( length );
            }

            if ( isNaN( length ) || typeof value === 'undefined' ) {
                return;
            }

            return ( value.length >= length );
        },

        //###Method - hasMaxLength(value)
        //Public method to check if passed value is less than equal maximum characters.
        //
        //> parameters
        //>
        //+ *value* : *String* - Value that needs to be checked.
        //+ *length* : *Number* - Number specifing maximum number of characters.
        //
        //> returns
        //>
        //+ A boolean. true if passed value has minimum number of characters.
        maxLength: function ( value, length ) {
            if ( typeof length === 'string' ) {
                length = Number( length );
            }

            if ( isNaN( length ) || typeof value === 'undefined' ) {
                return;
            }

            return ( value.length <= length );
        },

        //###Method - isValidUsPhone(value)
        //Public method to check if passed value is a valid USA phone number.
        //This will internally call regexMatch method passing the pre-defined regex.
        //
        //> parameters
        //>
        //+ *value* : *String* - Value that needs to be checked.
        //
        //> returns
        //>
        //+ A boolean. true if passed value is a valid USA phone number.
        usPhone: function ( value ) {
            return methods.regexMatch( value, keys.US_PHONE );
        },

        //###Method - isValidDate(value)
        //Public method to check if passed value is a valid date.
        //This will internally call regexMatch method passing the pre-defined regex.
        //
        //> parameters
        //>
        //+ *value* : *String* - Value that needs to be checked.
        //
        //> returns
        //>
        //+ A boolean. true if passed value is a valid date.
        date: function ( value ) {
            return methods.regexMatch( value, keys.DATE );
        },

        //###Method - regexMatch(regex, value)
        //Public method to test passed value against the regex.
        //
        //> parameters
        //>
        //+ *regex* : *RegExp* - Regex pattern to test the value.
        //+ *value* : *String* - Value that needs to be checked.
        //
        //> returns
        //>
        //+ A boolean. true if passed value is a valid date.
        //+ undefined - If regex or value is blank or when not a valid regex
        regexMatch: function ( value, regex ) {
            if ( typeof regex === 'string' ) {
                regex = new RegExp( regex );
            }

            //!value was returning true for empty string hence changed to check typeof
            if ( !( regex instanceof RegExp ) || typeof value === 'undefined' ) {
                return;
            }
            return regex.test( value );
        },

        //###Method - isValidAddress(value)
        //Public method to check if passed value contains pobox or not for address fields
        //
        //> parameters
        //>
        //+ *value* : *String* - Value that needs to be checked.
        //
        //> returns
        //>
        //+ A boolean. true if passed value contains only pobox
        pobox: function ( value ) {
            if ( !value ) {
                return;
            }
            return methods.regexMatch( value, keys.POBOX );

        },

        //###Method - isValidPhonePatten(value)
        //Public method to check if passed value contains any discernable pattern or not for phonenumber fields
        //
        //> parameters
        //>
        //+ *value* : *String* - Value that needs to be checked.
        //
        //> returns
        //>
        //+ A boolean. true if passed value contains only valid number
        phonePattern: function ( value ) {
            if ( !value ) {
                return;
            }
            return methods.regexMatch( value, keys.PHONENUMBERPATTERN );
        },

        //###Method - isValidphonePattern(value)
        //Public method to check if passed value contains any discernable pattern like 000-000-000
        //
        //> parameters
        //>
        //+ *value* : *String* - Value that needs to be checked.
        //
        //> returns
        //>
        //+ A boolean. true if passed value contains only valid number
        phonePatternForzeroes: function ( value ) {
            if ( !value ) {
                return;
            }
            return methods.regexMatch( value, keys.PHONEPATTERNFORALLZEROES );

        },

        //###Method - isEqual(value1, value2)
        //Public method to test the two values equality.
        //
        //> parameters
        //>
        //+ *value1* : *String* |*Number*  - The value to be checked.
        //+ *value2* : *String* |*Number*  - Another value to be checked.
        //>
        //> returns
        //>
        //+ A boolean. true if both values are equal in value and type.
        //+ false if both values are not equal either in value or type.

        equal: function ( value1, value2 ) {
            return ( value1 === value2 );
        },

        //###Method - isGreaterThan(value, limit)
        //Public method to test the given value is greater than the limit value
        //
        //> parameters
        //>
        //+ *value* : *Number*  - The value to be checked against limit.
        //+ *limit* : *Number*  - The actual limit number to be compared with.
        //>
        //> returns
        //>
        //+ A boolean. true if the given value is greater than limit value.
        //+ false if the given value is less than or equal to limit value.

        greaterThan: function ( value, limit ) {
            return ( value > limit );
        },

        //###Method - hasDigit (value)
        //Public method to test the given value has a digit in it
        //
        //> parameters
        //>
        //+ *value* : *string*  - The value to be checked
        //>
        //> returns
        //>
        //+ A boolean. true if the given value constains at least one digit.
        //+ false if the given value doesn't contain any digit.

        hasDigit: function ( value ) {
            if ( !value ) {
                return;
            }
            return methods.regexMatch( value, keys.HAS_DIGIT );
        },

        //###Method - hasLowercase (value)
        //Public method to test the given value has a lowercase character in it
        //
        //> parameters
        //>
        //+ *value* : *string*  - The value to be checked
        //>
        //> returns
        //>
        //+ A boolean. true if the given value constains at least one lowercase character
        //+ false if the given value doesn't contain any lowercase character.

        hasLowercase: function ( value ) {
            if ( !value ) {
                return;
            }
            return methods.regexMatch( value, keys.HAS_LOWERCASE );
        },
        //###Method - hasUppercase (value)
        //Public method to test the given value has an uppercase character in it
        //
        //> parameters
        //>
        //+ *value* : *string*  - The value to be checked
        //>
        //> returns
        //>
        //+ A boolean. true if the given value constains at least one uppercase character
        //+ false if the given value doesn't contain any uppercase character.

        hasUppercase: function ( value ) {
            if ( !value ) {
                return;
            }
            return methods.regexMatch( value, keys.HAS_UPPERCASE );
        },

        //###Method - hasSpecialChar (value, pattern)
        //Public method to test passed value against the pattern.
        //
        //> parameters
        //>
        //+ *value* : *String* - Value that needs to be checked.
        //+ *pattern* : *RegExp* - Regex pattern to test the value.
        //
        //> returns
        //>
        //+ A boolean. true if passed value has the special characters defined in the regex
        //+ false - othersise
        hasSpecialChar: function ( value, pattern ) {
            return methods.regexMatch( value, pattern );
        },

        //###Method - confirmValue (value, options)
        //Public method to test if 2 related fields match.
        //
        //> parameters
        //>
        //+ *value* : *String* - Value that needs to be checked.
        //+ *options* : *Object* - Object in the form of { related: { value: "second value" } }
        //
        //> returns
        //>
        //+ A boolean. true if the values match or one or both are empty
        //+ false - otherwise
        confirmValue: function ( value, options ) {
            if ( value && options.related.value ) {
                return methods.equal( value, options.related.value );
            }

            return true;
        }
    };
    //###Method - validate(key, value, options)
    //Public method to test passed value.
    //
    //> parameters
    //>
    //+ *key* : *String* - Type of validation to be performed on the passed value. eg. 'numeric', 'date', etc...
    //+ *value* : *String* - Value that needs to be checked.
    //+ *options* : *Multi-typed* - Type of this parameters depends on what "key" is being passed.
    //For example if key is "minCharacters" then type will number and if key is "regexMatch" then type will regex;
    //
    //> returns
    //>
    //+ A boolean. true if passed value is a valid date.
    //+ undefined - If regex or value is blank or when not a valid regex
    validate = function ( key, value, options ) {

        //!value was returning true for empty string hence changed to check typeof
        if ( !key || typeof value === 'undefined' ) {
            return;
        }

        return methods[ key ].call( this, value, options );
    };

    //###Method - addMethod(methodName, methodFunction)
    //Public method to add validation methods.
    //
    //> parameters
    //>
    //+ *methodName* : *String* - Name of the method.
    //+ *methodFunction* : *Function* - Value that needs to be checked.
    //
    //> returns
    //>
    //+ A boolean. true if passed value is a valid date.
    //+ undefined - If methodName, methodFunction is undefined or methodName is not type of string or methodFunction is not type of 'function'
    addMethod = function ( methodName, methodFunction ) {
        if ( !methodName || typeof methodName !== 'string' || !methodFunction || typeof methodFunction !== 'function' || methods[ methodName ] !== undefined ) {
            return;
        }

        methods[ methodName ] = methodFunction;
    };

    return {
        validate: validate,
        addMethod: addMethod,
        isNotEmpty: methods.required,
        requiredSelect: methods.requiredSelect,
        required: methods.required,
        isValidNumber: methods.numeric,
        isValidAlphaNumeric: methods.alphaNumeric,
        isValidZipCode: methods.zipCode,
        isValidEmail: methods.email,
        isValidUsCurrency: methods.usCurrency,
        hasDigit: methods.hasDigit,
        hasLowercase: methods.hasLowercase,
        hasUppercase: methods.hasUppercase,
        hasSpecialChar: methods.hasSpecialChar,
        hasMinLength: methods.minLength,
        hasMaxLength: methods.maxLength,
        isValidUsPhone: methods.usPhone,
        isValidDate: methods.date,
        regexMatch: methods.regexMatch,
        isAlphabets: methods.alphabhets,
        isValidAddress: methods.pobox,
        isValidPhonePatten: methods.phonePattern,
        isEqual: methods.equal,
        isGreaterThan: methods.greaterThan,
        confirmValue: methods.confirmValue,
        phonePatternForzeroes: methods.phonePatternForzeroes
    };

} );
