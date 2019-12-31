define( [ "validation" ], function ( Validation ) {

    //###Method - isLessThanOrEqualTo(contributionAmt, contributionAmtRemaining)
    //Public method to check the amount contributed is less than or equal to amount remaining.
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

    var isLessThanOrEqualTo = function ( contributionAmt, contributionAmtRemaining ) {
        contributionAmt = +contributionAmt; //convert string to number
        if ( contributionAmtRemaining < 10.00 ) {
            contributionAmtRemaining = 10.00;
        }
        return ( Validation.isEqual( contributionAmt, contributionAmtRemaining ) || ( contributionAmt < contributionAmtRemaining ) );
    };


    Validation.addMethod( "lessThanOrEqualTo", isLessThanOrEqualTo );

    return isLessThanOrEqualTo;

} );
