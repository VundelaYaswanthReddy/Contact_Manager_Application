const express  = require('express')
const app = express()

const mongoose = require('mongoose')

app.use(express.json())

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@sandbox.nucrbbe.mongodb.net/?retryWrites=true')
.then(()=> console.log("Connectwd to db"))
.catch((err)=> console.log('Unable to connect to db'))

names=[{name:"yaswanth"}]

app.post('/names',(req,res)=>{

    peru= req.body
    names.push(peru)
    res.send(201)

})

app.get('/names',(req,res)=>{
    res.send(names)
})




app.listen(8000,()=>{
    console.log("App is running")
})