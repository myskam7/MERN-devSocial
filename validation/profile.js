const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    data.website = !isEmpty(data.website) ? data.website : '';

    //Handle 
    if(!Validator.isLength(data.handle, {min: 3, max: 36})) {
        errors.handle = 'Handle needs to be at between 3 and 40 characters'
    }
    if(Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }

    //Status Field
    if(Validator.isEmpty(data.status)) {
        errors.status = 'Status Field is required';
    }

    //Skills Field
    if(Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills Field is required';
    }

    //NOT SAVING INTO THE PROFILE
    //Website(since its not req then we will first check isEmpty 1st then Validate)
    if(!isEmpty(data.website)) {
       if(!Validator.isURL(data.website)) {
           errors.website = 'Not a Valid URL'
       }
    }
    
    
    //Social 
    if(!isEmpty(data.facebook)) {
       if(!Validator.isURL(data.facebook)) {
           errors.facebook = 'Not a Valid URL'
       }
    }
    if(!isEmpty(data.twitter)) {
       if(!Validator.isURL(data.twitter)) {
           errors.twitter = 'Not a Valid URL'
       }
    }
    if(!isEmpty(data.linkedin)) {
       if(!Validator.isURL(data.linkedin)) {
           errors.linkedin = 'Not a Valid URL'
       }
    }
    

    return {
        errors, 
        isValid: isEmpty(errors)
    };
};