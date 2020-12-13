const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
    userId: String,
    name: String,
    email: String,
    country: String,
    address: String,
    city: String,
    postcode: String,
    phone: String,
    cart: Array
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
