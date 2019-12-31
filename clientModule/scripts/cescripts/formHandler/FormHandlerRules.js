define( {
    firstName: {
        required: true,
        minLength: 5,
        maxLength: 16
    },
    lastName: {
        required: true,
        minLength: 7,
        maxLength: 10
    },
    address: {
        required: true,
        minLength: 10
    },
    city: {
        required: true,
        alphabhets: true
    },
    state: {
        required: true
    },
    zipCode: {
        required: true,
        numeric: true
    },
    required: {
        required: true
    },
    alphabhets: {
        alphabhets: true
    },
    phone: {
        usPhone: true,
        maskPattern: '(000) 000-0000'
    },
    password: {
        required: true,
        minLength: 7,
        maxLength: 16,
        regexMatch: /^[a-zA-Z0-9~`!@#$%^&*(){}\[\]:;"'<>?+]*$/
    },
    passwordConfirm: {
        equal: 'profile.password'
    },
    ageverified: {
        required: true
    
    }
} );
