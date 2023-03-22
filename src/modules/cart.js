const mongoose = require('mongoose')
// const userId = require ('../modules/users')
const cartSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId , ref: 'userId' 
        },
        plants:{
            type: Array,
            require: false,
        }
    }
    
) 
const Cart = mongoose.model('Cart',cartSchema);
module.exports = Cart;