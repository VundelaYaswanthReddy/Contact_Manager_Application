const express  = require('express')
const app = express()
const mongoose = require('mongoose')
const Signup = require('./Signup')
const Login = require('./login')
const Session = require('express-session')



app.use(express.json())
app.use(express.urlencoded())
app.use('Session({
        resave : true,
        saveUninitialized: true,
        secret: 'bla bla bla'
        }))
app.use(Signup)
app.use(Login)

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@sandbox.nucrbbe.mongodb.net/?retryWrites=true')
.then(()=> console.log("Connected to db"))
.catch((err)=> console.log('Unable to connect to db'))



const port = 8000;

app.listen(port,()=>{
    console.log("App is running on our port : ",port)
})
