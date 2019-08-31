const validDate = str => {
    return typeof str === 'date' && str.trim().length > 0;
}

module.exports = validDate;