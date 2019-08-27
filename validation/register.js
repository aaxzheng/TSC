const Validator = require('Validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.name = validText(data.name) ? data.name : '';
    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';
    if (!Validator.isLength(data.name, {min: 3, max: 90})) {
        errors.name = "Name must be between 3 and 90 characters";
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "E-mail is required";
    }
    if (Validator.isEmail(data.email)) {
        errors.email = "Please enter a valid e-mail address";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};