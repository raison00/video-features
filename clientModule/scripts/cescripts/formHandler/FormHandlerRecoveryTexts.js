define( {
    creditcard: {
        required: 'Please enter a valid credit card type'
    },
    creditcardnumber: {
        required: 'Please enter a valid credit card number',
        minLength: 'Credit card number must be at least 12 numbers',
        maxLength: 'Credit card number must not be more than 12 numbers'
    },
    cvv: {
        instructions: {
            text: "Please enter the cvv code from back of card",
            items: []
        },
        required: 'This is required'
    },
    cardexpirationmonth: {
        required: "This is required"
    },
    cardexpirationyear: {
        required: "This is required"
    },
    firstName: {
        required: 'First Name is required',
        alphaNumeric: 'Alphanumeric only',
        minLength: 'Min length is 5',
        maxLength: 'Max length is 16'
    },
    lastName: {
        required: 'This is required',
        alphaNumeric: 'Alphanumeric only: this is a really really really really really really really really really really really really long message to test the line height spacing for multi-line error message display',
        minLength: 'Min length is 7',
        maxLength: 'Max length is 10'
    },
    address: {
        required: 'This is required',
        alphaNumeric: 'no special characters',
        minLength: 'Must be at least 10 characters'
    },
    password: {
        instructions: {
            text: 'Please enter a valid <b>password</b>',
            items: [ 'Must be between 7-16 characters long' ]
        },
        required: 'This is required',
        minLength: 'Min length is 7',
        maxLength: 'Max length is 16',
        regexMatch: 'Sorry, but your password must be 7-16 characters without . , - | \\ / = _ or spaces.'
    },
    passwordConfirm: {
        required: 'This is required',
        equal: 'Value must equal Password'
    },
    city: {
        required: 'This is required',
        alphabhets: 'alphabets only, please'
    },
    state: {
        required: 'This is required'
    },
    zipCode: {
        required: 'This is required',
        numeric: 'Numbers only, please'
    },
    phone: {
        required: 'This is required'
    },
    username: {
        instructions: {
            text: "Username must be:",
            items: [ "Between 6-8 characters", "No spaces" ]
        },
        required: 'This is required'
    },
    email: {
        instructions: {
            text: "Please enter your primary email address",
            items: []
        },
        required: 'This is required'
    },
    required: {
        required: 'This is required'
    },
    alphabhets: {
        alphabhets: 'Alphabets Only'
    }

} );
