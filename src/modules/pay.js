const mongoose = require('mongoose')
const paySchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId , ref: 'userId' 
        },
        plants:{
            type: Array,
            require: false,
        },
        total:{
            type: Number,
            require: true,
            default: 0
        },
        shipment:{
            type: Number,
            require : true,
            default: 0,
        },
        Voucher:{
            type: String,
            require: false
        },
        totalBill:{
            type: Number,
            require: true,
            default : 0
        }
    }
    
) 
const Pay = mongoose.model('Pay',paySchema);
module.exports = Pay;