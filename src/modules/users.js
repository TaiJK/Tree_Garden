const mongoose = require('mongoose')
const userSchema  = mongoose.Schema(
    {
        nameUser: {
        type: String,
        required: [true," Enter the user name: "]
        },
        phone: {
            type : Number,
            required : true,
            default: 0

        },
        password: {
            type: String,
            required: true 
        },
        isWelcome:{
        default : false 
        },
        listOrder :{
        type: Array
       }
    },
    {
        timestampt: true,
    }
)

//const Plant = mongoose.model('Plant',plantSchema);
const User = mongoose.model('User',userSchema);
module.exports = User;