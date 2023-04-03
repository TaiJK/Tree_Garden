const mongoose = require('mongoose')
const orderSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId , ref: 'userId' 
        },
        CartId: {
            type: mongoose.Schema.Types.ObjectId , ref: 'CartId' 
        },
        phone: {
            type: mongoose.Schema.Types.Number ,ref: 'phone'
        },
        plants:{
            type: mongoose.Schema.Types.Array ,ref: 'plants'
        },
        nameUser:{
            type: mongoose.Schema.Types.String, ref:' nameUser'
        },
        total:{
            type: Number,
            require: true,
            default: 0
        },
        discount:{
            type: mongoose.Schema.Types.String, ref: 'discount'
        },
        shipment:{
            type: Number,
            require : true,
            default: 0,
        },
        finalTotal:{
            type: Number,
            require: true,
            default : 0
        },
        paymentMethod:{
            type: Boolean,
            require : true
        }
    }
) 
const Order = mongoose.model('Order',orderSchema);
module.exports = Order;