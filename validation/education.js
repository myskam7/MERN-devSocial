const Validator = require('validator');

const isEmpty = require('./is-empty');


module.exports = function validateEducationInput(data) {
    let errors = {}; 


    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.major = !isEmpty(data.major) ? data.major : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    // data.location = !isEmpty(data.location) ? data.location : '';
    // data.current = !isEmpty(data.current) ? data.current : '';
    // data.description = !isEmpty(data.description) ? data.description : '';


  
    if(Validator.isEmpty(data.school)){
        errors.school = "School is Required"
    }
    if(Validator.isEmpty(data.degree)){
        errors.degree = "Degree is Required"
    }
    if(Validator.isEmpty(data.major)){
        errors.major = "Major is Required"
    }
    if(Validator.isEmpty(data.from)){
        errors.from = "From date field is Required"
    }
    
    
    
   


    return {
        errors, 
        isValid: isEmpty(errors)
    };
};