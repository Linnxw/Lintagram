import User from "../models/userModels.js"
import jwt from "jsonwebtoken"
import passwordHash from "password-hash"
export const login=async(req,res)=>{
  const token = req.cookies.refreshToken
  const {email,password} = req.body
  try{
    const user=await User.findOne({
      where:{
        email:email
      }
    })
    if(!user)
    return res.status(404).json({msg:"email tidak terdaftar"})
    
    const match=passwordHash.verify(password,user.password)
    if(!match)
    return res.status(401).json({msg:"password salah"})
    if(user.refresh_token)
    return res.status(500).json({msg:"akun telah terpakai di perangkat/browser lain"})
    const accesToken=jwt.sign({
      id:user.id,
      name:user.name,
      email:user.email,
      role:user.role
    },process.env.ACCES_TOKEN,{
      expiresIn:'40s'
    })
    const refreshToken=jwt.sign({
      id:user.id,
      name:user.name,
      email:user.email,
      role:user.role
    },process.env.REFRESH_TOKEN,{
      expiresIn:'1d'
    })
    await User.update({refresh_token:refreshToken},{
      where:{
        id:user.id
      }
    })
    res.cookie('refreshToken',refreshToken,{
      maxAge:24*60*60*1000,
      httpOnly:true
    })
    res.status(200).json({accesToken})
  }catch(err){
    res.status(500).json({msg:err.message})
  }
}

export const logout=async(req,res)=>{
   const refreshToken=req.cookies.refreshToken
   console.log({refreshToken})
  if(!refreshToken)
  return res.status(401).json({msg:"anda belum login"})
  const user=await User.findOne({
    where:{
      refresh_token:refreshToken
    }
  })
  if(!user)
  return res.status(404).json({msg:"user tidak ditemukan"}) 
  await User.update({refresh_token:null},{
    where:{
      id:user.id
    }
  })
  res.clearCookie('refreshToken',(err)=>{
    if(err)
    return res.status(500).json({msg:"gagal logout"})
    
  })
  res.status(200).json({msg:"logout berhasil"})
}

export const Me=async(req,res)=>{
  const refreshToken=req.cookies.refreshToken
  try{
    const user= await User.findOne({
      attributes:['id','name','email','refresh_token','role'],
      where:{
        refresh_token:refreshToken
      }
    })
    
    if(!user)
    return res.status(404).json({msg:"user tidak terdaftar"})
    res.status(200).json(user)
  }catch(err){
    res.status(500).json({msg:err.message})
  }
}

export const refreshToken=async(req,res)=>{
  const token=req.cookies.refreshToken
  if(!token)
  return res.sendStatus(401)
  const user=await User.findOne({
    where:{
      refresh_token:token
    }
  })
  if(!user)
  return res.sendStatus(404)
  jwt.verify(token,process.env.REFRESH_TOKEN,(err,decoded)=>{
    if(err)
    return res.sendStatus(403)
    const id=user.id
    const name=user.name
    const email=user.email
    const role=user.role
    const accesToken=jwt.sign({id,name,email,role},process.env.ACCES_TOKEN,{
      expiresIn:'40s'
    })
    res.status(200).json({accesToken})
  })
}