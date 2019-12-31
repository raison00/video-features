//#MODULE - CvAgeDifference
//> Author: Ramesh Polishetti
//>
//> Create Date: 2014-09-04
//>
//##DESCRIPTION: Custom age difference form validation method to inject into validation.js. Checks whether with the given date of birth, reached minimum age.


define( [ "validation", "dateUtil" ], function ( Validation, DateUtil ) {

    //###Method - checkAge(value, limitYears)
    //Public method to check the age with given date of birth is equal or greater than the limit years.
    //
    //> parameters
    //>
    //+ *value* : *Valid Date string* |* milliseconds * 
    //+ *limitYears* : *Years to compare*
    //
    //
    //> returns
    //>
    //+ Boolean value of True if the age with given date of birth is equal or greater than the limit years 
    //+ False if the age with given date of birth is less than the limit years 

    var checkAge = function ( value, limitYears ) {

        var curDate = new Date(),
            birthDate = new Date( value ),
            currentYear = curDate.getFullYear(),
            currentMonth = curDate.getMonth() + 1,
            i,
            totalDays = 0;

        /* function isCutOffMonth( month, year ) {
            if ( DateUtil.checkLeapYear( year ) && month > 2 ) {
                return true;
            }
            return false;
        }*/

        for ( i = 0; i < limitYears; i++ ) {
            var upMonth = DateUtil.checkLeapYear( currentYear );
            totalDays += ( upMonth ? 366 : 365 );
            currentYear = currentYear - 1;
        }
        var cutOfTime = totalDays * 86400000,
            actualAgeTime = curDate.getTime() - birthDate.getTime();

        return ( Validation.isEqual( actualAgeTime, cutOfTime ) || Validation.isGreaterThan( actualAgeTime, cutOfTime ) );

    };
    Validation.addMethod( "ageDifference", checkAge );
    return checkAge;

} );
