const express = require('express')
const bookRoutes = require('./routes/bookRoutes')
const connectDb = require('./config/dbConnection')
require('dotenv').config()
connectDb()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/api',bookRoutes)

app.get('/',(req,res)=>{
    res.status(200).json({"status":"healty"})
})

app.listen(PORT, (error)=>{
    if(!error){
        console.log(`Server is running on ${PORT}`)
    }else{
        console.log(`Error occured ${error}`)
    }
})