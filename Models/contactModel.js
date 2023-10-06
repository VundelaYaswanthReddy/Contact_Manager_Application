const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"Please give the contact name.."]
    },
    email:{
        type:String,
        required:[true,"Please add the Email.."]
    },
    phone:{
        type:String,
        required:[true,"Please add the phone number.."]
    }
},
{
    timestamps:true
})


module.exports = mongoose.model("Contact",contactSchema)