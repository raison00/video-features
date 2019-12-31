//#MODULE - Validators
//> Author: Catherine Sambula
//>
//> Create Date: <May 1, 2014>
//>
//##DESCRIPTION: This hold the objects for the common validators.
define( [ 'jquery', 'globals', 'segmentation' ], function ( $, Globals, Segmentation ) {

    var standardStringPattern = /^[-a-zA-Z'\s\.]+$/,
        extendedStringPattern = /^[-a-zA-Z0-9'#\s\.\/]+$/,
        /*For non-dependency fields, please add the validators in alphabetical order*/
        attentionOptionalValidator = {
            maxLength: 35,
            regexMatch: /^[a-zA-Z\.\-\'\ ]+$/
        },
        cardNumberOptionalValidator = {
            regexMatch: /^(\*{5,16}|\d{5,16})[0-9]{4}$/
        },
        giftCardNumberValidator = {
            required: true,
            minLength: 15,
            regexMatch: /^(\*{11,16}|\d{11,16})[0-9]{4}$/
        },
        cardNumberValidator = $.extend( true, {
            required: true
        }, cardNumberOptionalValidator ),

        cardTypeValidator = {
            required: true
        },
        securityCodeValidator = {
            required: true,
            minLength: 3,
            maxLength: 4
        },
        dateValidator = {
            day: {
                required: true,
                requiredSelect: true
            },
            month: {
                required: true,
                requiredSelect: true
            },
            year: {
                required: true,
                requiredSelect: true
            }
        },
        emailValidator = {
            required: true,
            maxLength: 75,
            email: true
        },
        firstNameValidator = {
            required: true,
            maxLength: 20,
            regexMatch: standardStringPattern
        },
        lastNameValidator = {
            required: true,
            maxLength: 30,
            regexMatch: standardStringPattern
        },
        middleNameOptionalValidator = {
            maxLength: 20,
            regexMatch: standardStringPattern
        },
        offerCodeValidator = {
            required: true,
            alphaNumeric: true
        },
        passwordValidator = [ {
            required: true
        }, {
            minLength: 5
        }, {
            maxLength: 16
        } ],

        passwordStrengthValidator = [ {
            required: true
        }, {
            minLength: 7
        }, {
            maxLength: 16
        }, {
            regexMatch: /^[a-zA-Z0-9\[\]?*<~#`!+@$%^&()}:\";'>{]*$/
        }, {
            confirmValue: {
                related: {
                    prefix: 'confirm'
                }
            }
        } ],

        phoneOptionalValidator = {
            areaCode: {
                minLength: 3,
                maxLength: 3,
                numeric: true
            },
            exchangeNumber: {
                minLength: 3,
                maxLength: 3,
                numeric: true
            },
            subscriberNumber: {
                minLength: 4,
                maxLength: 4,
                numeric: true
            }
        },

        phoneValidator = $.extend( true, {
            areaCode: {
                required: true
            },
            exchangeNumber: {
                required: true
            },
            subscriberNumber: {
                required: true
            }
        }, phoneOptionalValidator ),

        phoneNumberOptionalValidator = {
            //exactly 10-digit || "(ddd) ddd-dddd" || "(ddd)ddd-dddd"
            regexMatch: /^(?:(?:\d{10})|(?:\(\d{3}\)\s{0,1}\d{3}-\d{4}))$/
        },

        phoneNumberValidator = $.extend( true, {
            required: true
        }, phoneNumberOptionalValidator ),

        securityQAValidator = {
            securityAnswer: {
                required: true,
                minLength: 2,
                maxLength: 20
            },
            securityQuestion: {
                required: true,
                requiredSelect: true
            }
        },
        registryIdValidator = {
            required: true,
            numeric: true,
            maxLength: 9
        },
        Validators;

    //1134 is for mcom and 1136 is bcom authweb signin experimental cookie value
    Segmentation.detect( [ 1134, 1136 ], function ( segmentValue ) {
        var globalProps = Globals.getValue( 'props' );
        if ( typeof globalProps !== "undefined" && globalProps.authWebEnabled === true ) {
            if ( ( segmentValue === 1134 && globalProps.site === 'MCOM' ) || ( segmentValue === 1136 && globalProps.site === 'BCOM' ) ) {
                passwordValidator.push( {
                    regexMatch: /^[a-zA-Z0-9\[\]?*<~#`!+@$%^&()}:\";'>{]*$/
                } );
            }
        }
    } );

    passwordStrengthValidator.hasRelatedFieldValidators = true;

    /*Validators = object to be returned with field: fieldValidator.
     * New field: fieldValidator associations should be added in this object in alphabetical order.*/
    Validators = {
        address: {
            firstName: firstNameValidator,
            lastName: lastNameValidator,
            addressLine1: {
                required: true,
                maxLength: 35,
                regexMatch: extendedStringPattern
            },
            addressLine2: {
                maxLength: 35,
                regexMatch: extendedStringPattern
            },
            city: {
                required: true,
                maxLength: 25,
                regexMatch: standardStringPattern
            },
            state: {
                required: true,
                requiredSelect: true
            },
            zipCode: {
                required: true,
                minLength: 5,
                zipCode: true
            },
            email: emailValidator
        },
        cardNumber: cardNumberValidator,
        cardNumberOptional: cardNumberOptionalValidator,
        cardType: cardTypeValidator,
        creditCard: {
            // cardType is a nestedModel, can't be together with cardModel validators
            // that's why isn't included in the creditCard validator object
            cardNumber: cardNumberValidator,
            expMonth: dateValidator.month,
            expYear: dateValidator.year,
            securityCode: securityCodeValidator
        },
        giftCard: giftCardNumberValidator,
        email: emailValidator,
        firstName: firstNameValidator,
        middleNameOptional: middleNameOptionalValidator,
        lastName: lastNameValidator,
        offerCode: offerCodeValidator,
        password: passwordValidator,
        passwordStrength: passwordStrengthValidator,
        //3-field phone
        phone: phoneValidator,
        phoneOptional: phoneOptionalValidator,
        //single field phone
        phoneNumber: phoneNumberValidator,
        phoneNumberOptional: phoneNumberOptionalValidator,
        date: dateValidator,
        registryId: registryIdValidator,
        securityQA: securityQAValidator,
        attentionOptional: attentionOptionalValidator
    };

    return Validators;
} );
