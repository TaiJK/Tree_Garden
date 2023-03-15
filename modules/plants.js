// plants modules
const mongoose = require('mongoose')
const plantSchema  = mongoose.Schema(
    {
                
        namePlant: {
        type: String,
        required: [true," Enter the kind name: "]
        },
        quantity: {
            type : Number,
            required : true,
            default: 0

        },
        price: {
            type: Number,
            required: true 
        },
        image :{
            type: String,
            required : false
        },
        discount:{
            type: Number,
            required : false 
        }
    },
    {
        timestampt: true,
    }
)


const Plant = mongoose.model('Plant',plantSchema);
module.exports = Plant;




