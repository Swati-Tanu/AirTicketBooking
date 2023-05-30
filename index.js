const express = require("express");
const connection = require("./config/db");
const useRouter = require("./routes/Router") 
require("dotenv").config()
const PORT=process.env.port || 8765

const app = express();

app.use(express.json())

app.get("/", (req,res)=>{
    res.send(`Welcome to Air Ticket Booking`)
})

app.use("/api", useRouter)

app.listen(PORT, async() => {
    try{
         await connection
         console.log(`Connected to DataBase`)
    }catch(err){
        console.log(err)
    }
    console.log(`Server running at port ${PORT}`)
})