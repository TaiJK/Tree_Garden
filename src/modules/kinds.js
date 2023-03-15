
//kinds
const mongoose = require('mongoose')
const kindSchema  = mongoose.Schema(
    {
        idK: {
            type: Number,
            required : true
        },
        nameKind:{

        type: String,
        required: [true," Enter the kind name: "]
        },
        size :{
            type : String,
            required: true
        },
        tempt: {
            type: String,
           required: true
        },
        hight: {
            type : Number,
           required : true 
        },
        often: {
            type: String ,
           required: true,
            default : '1 lan /ngay'
        },
        list:{
            type : String,
            required: true
        }

    },
    {
        timestampt: true,
    }
    )
const Kind = mongoose.model('Kind',kindSchema);
module.exports = Kind;


