const express = require("express");
const app = express();
const dotenv = require("dotenv")
const routerContact = require("./Routes/contactRoutes")
const routerUser = require("./Routes/userRoutes")
const errorHandler = require("./middleware/errorHandler")
const connectDb = require("./config/dbConnection")
const Port = process.env.PORT||8080;
dotenv.config()

app.use(express.json())
app.use(express.urlencoded())
app.use("/api/contact",routerContact)
app.use("/api/user",routerUser)
app.use(errorHandler)

connectDb();
app.listen(Port,()=>{
    console.log(`App is running on the port ${Port}`)
})
