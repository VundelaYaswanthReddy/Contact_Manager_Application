const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please give the User name..."]
    },
    email:{
        type:String,
        required:[true,"Please add the email.."],
        unique:[true,"This email has already taken..."]
    },
    password:{
        type:String,
        required:[true,"Please add or create a password..."]
    }
},
{
    timestamps:true 
})


module.exports = mongoose.model("User",userSchema)