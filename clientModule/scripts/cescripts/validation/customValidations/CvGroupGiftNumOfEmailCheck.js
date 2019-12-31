define( [ "validation" ], function ( Validation ) {

    //###Method - ggMaxNumberOfEmails(emailList, maxNumAllowed)
    //Public method to check the number of emails.
    //
    //> parameters
    //>
    //
    //
    //
    //
    //> returns
    //>
    //+
    //+

    var ggMaxNumberOfEmails = function ( emailList, maxNumAllowed ) {
        var emailArray = emailList.split( "," );
        var emailListSize = emailArray.length;

        return ( Validation.isEqual( emailListSize, maxNumAllowed ) || ( emailListSize < maxNumAllowed ) );
    };


    Validation.addMethod( "ggNumberOfEmails", ggMaxNumberOfEmails );

    return ggMaxNumberOfEmails;

} );
