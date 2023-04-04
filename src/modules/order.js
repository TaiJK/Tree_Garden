const mongoose = require('mongoose')
const orderSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId , ref: 'userId' 
        },
        cartId: {
            type: mongoose.Schema.Types.ObjectId , ref: 'CartId' 
        },
        nameUser:{
            type: mongoose.Schema.Types.String, ref:' nameUser'
        },
        phone: {
            type: mongoose.Schema.Types.Number ,ref: 'phone'
        },
        plants:{
            type: mongoose.Schema.Types.Array ,ref: 'plants'
        },
      
        total:{
            type: mongoose.Schema.Types.Number, ref: 'temporaryTotal'
        },
        discount:{
            type: mongoose.Schema.Types.String, ref: 'totalDiscount'
        },
        shipment:{
            type: Number,
            require : true,
            default: 0,
        },
        finalTotal:{
            type: mongoose.Schema.Types.Number, ref: 'total'
        },
        recive:{
            type: Number,
            default: 0 
        },
        change:{
            type: Number,
            default: 0
        },
        paymentMethod:{
            type: String,
            require: true,
            default: 'Cash in hand'
        },
        statusOrder:{
            type: String,
            require : true
        }
    }
) 
const Order = mongoose.model('Order',orderSchema);
module.exports = Order;