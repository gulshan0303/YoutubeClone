
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();


app.use(express.json());
app.use(cookieParser())
//routes path
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const videoRoutes = require("./routes/video")
const commentRoutes = require("./routes/comment");





app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/video',videoRoutes)
app.use('/api/comment',commentRoutes)

//middleware

app.use((err,req,res,next) =>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong!!";
   return res.status(status).json({
        success:false,
        status,
        message
    })
})

const port = process.env.PORT || 3000


//connect db

const dbConnection = () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("database connected!!")
    } catch (error) {
        console.log(error)
    }
}

app.listen(port,() => {
    dbConnection();
    console.log(`server is running at ${port}`);
})