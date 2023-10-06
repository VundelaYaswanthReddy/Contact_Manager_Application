const asyncHandler = require("express-async-handler")
const User = require("../Models/userModel")
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = asyncHandler(async(req,res)=>{
    
    const { username,email,password } = req.body

    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields { username,email,password } are mandatory...")
    }
    userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User email exists or user already registered")
    }

    const hashedPassword = await bcrypt.hash(password,10)
    console.log(`Hashed password : ${hashedPassword}`)
    const user = await User.create({ username, email, password:hashedPassword })

    if(user){
        res.status(201).json({ _id:user.id, email:user.email })
    }
    else{
        res.status(400)
        throw new Error("User data is not valid..")
    }

})

const loginUser = asyncHandler(async(req,res)=>{
    
    const { email, password } = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All fields { Email,Password } are mandatory")
    }
    const user = await User.findOne({email})
    comp_password = await bcrypt.compare(password,user.password)
    if(user && comp_password){
        const accessToken = jwt.sign(
            {
                user:{
                    username:user.username,
                    email:user.email,
                    id:user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"15m"}
        )
        res.status(200).json({accessToken})
    }
    else{
        res.status(400)
        throw new Error("Username or Password is Invalid..")
    }
})

const currentUser = asyncHandler(async(req,res)=>{
     
    res.status(200).json({message:"Current user informaton.."});
})



module.exports = {registerUser,loginUser,currentUser}