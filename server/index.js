import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import cors from "cors";
import postRouter from "./routes/postRouter.js";
import profileRouter from "./routes/profileRouter.js";
import authRouter from "./routes/authRouter.js"
import fileUpload from "express-fileupload"
dotenv.config()
const app=express();

app.use(cors({credentials:true,origin:"http://localhost:5173"}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload())
app.use(express.static("./public"))

app.use(userRouter)
app.use(postRouter)
app.use(authRouter)
app.use(profileRouter)

app.listen(process.env.PORT,()=>{
  console.log(`server runing in port ${process.env.PORT}`)
})