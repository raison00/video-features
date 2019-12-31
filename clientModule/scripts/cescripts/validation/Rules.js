// 20160922 Hans 

define( {
    firstName: {
        required: true,
        minLength: 1,
        maxLength: 16
    },
    lastName: {
        required: true,
        minLength: 2,
        maxLength: 10
    },
    address: {
        required: true,
        minLength: 4
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
        numeric: true,
        maxLength: 5
    },
    required: {
        required: true
    },
    email: {
        required: true,
        email: true
    }, 
    emailConfirm: {
        required: true,
        equal: 'email'
    },         
    alphabhets: {
        alphabhets: true
    },
    phone: {
        required: true,
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
        equalTo: 'profile.password'
    }
} );
