import jwt from "jsonwebtoken"
import User from "../models/userModels.js"

export const verifyLogin=(req,res,next)=>{
  const header=req.headers['authorization']
  const token=header && header.split(" ")[1]
  if(token == null )
  return res.sendStatus(401)
  jwt.verify(token,process.env.ACCES_TOKEN,(err,decoded)=>{
    if(err)
    return res.sendStatus(403)
    req.email=decoded.email
    next()
  })
}

export const verifyAdmin=async(req,res,next)=>{
  try{
    const user=await User.findOne({
      where:{
        email:req.email
      }
    })

    if(user.role !== "admin")
    return res.status(401).json({msg:"akses ditolak"})
    next()
  }catch(err){
    res.status(500).json({msg:err.message})
  }
}