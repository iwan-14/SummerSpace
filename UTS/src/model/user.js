const mongoose = require('mongoose')
const { Schema } = mongoose

const userShema = new Schema({
    name: String,
    email: String,
    phone: Number,
    password: String
})

const User = mongoose.model('User', userShema)

module.exports = User
