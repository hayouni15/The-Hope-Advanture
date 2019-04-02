const mongoose = require('mongoose')
const validator= require ('validator')

const subscribers = mongoose.model('subscribers',{
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    }
})

module.exports = subscribers