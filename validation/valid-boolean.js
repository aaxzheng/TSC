const validBoolean = str => {
    if (typeof str === 'boolean') {
        return "true";
    } else {
        return "false";
    };
}

module.exports = validBoolean;