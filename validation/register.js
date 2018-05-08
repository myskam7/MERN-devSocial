const Validator = require('validator');

const isEmpty = require('./is-empty');


module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';


    //Name Field
    if(Validator.isEmpty(data.name)) {
        errors.name = "Name is Required"
    }
    if(!Validator.isLength(data.name, { min: 3, max: 36 })){
        errors.name = 'Name must be between 3 and 36 character'
    }

    //Email Field
    if(Validator.isEmpty(data.email)){
        errors.email = "Email is Required"
    }
    if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid"
    }
    
        //Password Field
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }

    //Confirm Password Field
    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Confirm Password is Required"
    }
    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = "Passwords Must Match"
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    };
};