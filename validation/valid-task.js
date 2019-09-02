const Validator = require('Validator');
const validText = require('./valid-text');
const validDate = require('./valid-date');
const validBoolean = require('./valid-boolean');

module.exports = function validateTaskInput(data) {
    let errors = {};
    data.name = validText(data.name) ? data.name : '';
    data.startTime = validText(data.startTime) ? data.startTime : '';
    data.endTime = validText(data.endTime) ? data.endTime : '';
    data.pub = validBoolean(data.pub) ? data.pub : false;
    if (!Validator.isLength(data.name, { min: 1, max: 90 })) {
        errors.name = "Name must be between 1 and 90 characters";
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }
    if (Validator.isEmpty(data.startTime)) {
        errors.startTime = "A start time is required";
    }
    if (Validator.isEmpty(data.endTime)) {
        errors.endTime = "An end time is required";
    }
    if (Validator.isBoolean(data.pub)) {
        errors.pub = 'A task must be specified public or private';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
