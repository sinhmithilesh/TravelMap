const express  = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()

const pinRouter = require("./routes/pin")
const userRouter = require("./routes/users")


app.use(cors())
app.use(express.json())

//routes
app.use("/api/pins", pinRouter)
app.use('/api/users', userRouter)
 
const start = async(url) => { 
    try{
        await mongoose.connect(url, {useNewUrlParser : true}) 
        console.log("DB connected")
        app.listen(8087, ()=>{
            console.log("server is listening on 8087")
        })
    }
    catch(err){
    console.log('backend is not runnig')
    }
}

start(process.env.MongoDBURL)