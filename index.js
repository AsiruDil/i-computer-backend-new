import express from "express";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import authenticateUser from "./middlewares/authentication.js";

dotenv.config()

const app=express();

const mongodbURI=process.env.MONGO_URI

mongoose,connect(mongodbURI).then(()=>{
    console.log("connected to MongoDB")
}).catch((error)=>{
    console.log("mongoDB connection Failed")
})

app.use(cors())

app.use(express.json())
app.use(authenticateUser)

app.use("/api/users",userRouter)


app.listen(3000,(req,res)=>{
    console.log("server is running on port 3000")
})

