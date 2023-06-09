const mongoose = require('mongoose')

const isValidObjectId = function (x) {
    return mongoose.Types.ObjectId.isValid(x);
}

const isValid = function (x) {
    if (typeof x === 'undefined' || x === null) return false
    if (typeof x != "string" ) return false
    if (typeof x === 'string' && x.trim().length === 0) return false
    return true
}


const isValidBody = function (y) {
    return Object.keys(y).length > 0
}



const isValidEmail = function (y) {

    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailRegex.test(y)) return true
}



const isValidPassword = function (y) {
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,15}$/
    if (passwordRegex.test(y)) return true
}

module.exports.isValidObjectId = isValidObjectId
module.exports.isValidBody = isValidBody
module.exports.isValid = isValid
module.exports.isValidEmail = isValidEmail
module.exports.isValidPassword = isValidPassword
