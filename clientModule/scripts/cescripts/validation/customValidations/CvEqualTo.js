//#MODULE - CvEqualTo
//> Author: Ramesh Polishetti
//>
//> Create Date: 2014-09-04
//>
//##DESCRIPTION: Custom form validation method ("equalTo") to inject into validation.js
define( [ "validation" ], function ( Validation ) {

    //###Method - equalTo ( value, compareFieldName);
    //Private method to check whether the value given is equal to input field's value having name attribute compareFieldName.
    //
    //> parameters
    //>
    //> 
    //+ *value* : *Number* - Number that needs to be compared.
    //+ *compareFieldName* : *String* - Custom input name attribute value, its value is to be compared to given value
    //
    //> returns
    //>
    //+ Boolean value of true if the given value is equal to input's value having name attribute of compareFieldName, false in case of not equal.
    //>


    var checkEquality = function ( value, compareFieldName ) {
        var compareToValue = document.getElementsByName( compareFieldName )[ 0 ].value;
        return Validation.isEqual( value, compareToValue );
    };

    Validation.addMethod( "equalTo", checkEquality );

    return checkEquality;

} );
