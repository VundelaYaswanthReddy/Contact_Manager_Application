const { Router } = require('express')
const router = Router()
const session = require('express-session')
const User = require('./Schema')


router.post('/signup',async (req,res)=>{
    const {username,password,email}=req.body;
    const userDB= await User.findOne({ $or: [{username},{ email }] });
    if(userDB)
    {
        res.status(400).send({msg: "user already exists"})
    }
    else{
        const newUser= await User.create({username,password,email});
        newUser.save();
        res.send('success created');
        
    };

})

module.exports = router
