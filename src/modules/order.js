const mongoose = require('mongoose')
const orderSchema = mongoose.Schema(
    {
        orderinfo:{
            type: Array,
            require : false 
        }
    }
) 
const Order = mongoose.model('Order',orderSchema);
module.exports = Order;