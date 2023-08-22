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

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig))
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