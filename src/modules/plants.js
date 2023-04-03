// plants modules
const mongoose = require('mongoose')
const plantSchema  = mongoose.Schema(
    {
        namePlant: {
        type: String,
        required: [true," Enter the plant name: "]
        },
    //    idKind:{
    //         type: mongoose.Schema.Types.ObjectId, ref :'idKind'
    //    },
        nameKind:{
            type: Object,
            require: true
        },
        quantity: {
            type : Number,
            required : true,
            default: 0

        },
        tag:{
            type: Array,
            require: false,
            default: 'plant'
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

//const Plant = mongoose.model('Plant',plantSchema);
const Plant = mongoose.model('Plant',plantSchema);
module.exports = Plant;




