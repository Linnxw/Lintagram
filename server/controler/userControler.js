import User from "../models/userModels.js";
import Profile from "../models/profileModels.js";
import Post from "../models/postModels.js";
import passwordHash from "password-hash"
export const getAllUser=async(req,res)=>{
  try{
    const user= await User.findAll({
      include:[{
        model:Profile
      },
      {
        model:Post
      }],
      attributes:['id','name','email','role']
    })
    res.status(200).json(user)
  }catch(err){
    res.status(500).json({msg:err.message})
  }
}

export const getUserById=async(req,res)=>{
  try{
    const user= await User.findOne({
      include:[{
        model:Profile,
        attributes:['id','me','url','image']
      },{
        model:Post,
        attributes:['id','title','url','path','userId']
      }],
      where:{
        id:req.params.id
      },
     attributes:['id','name','email','role']
    })
    if(!user)
    return res.status(404).json({msg:"user tidak ditemukan"})
    
    res.status(200).json(user)
  }catch(err){
    res.status(500).json({msg:err.message})
  }
}

export const createUser=async(req,res)=>{
  const {name,email,password,confPassword,role}=req.body
  try{
    const hash=passwordHash.generate(password)
    
    if(password !== confPassword)
    return res.status(400).json({msg:"password dan confirm password tidak cocok"})
    
    await User.create({name:name,email:email,password:hash,role:role})
    
    res.status(201).json({msg:"registrasi berhasil"})
  }catch(err){
    res.status(500).json({msg:err.message})
  }
}

export const updateUser=async(req,res)=>{
  const {name,email,password,confPassword}=req.body
  try{
    const user=await User.findOne({
      where:{
        id:req.params.id
      }
    })
    if(!user)
    return res.status(404).json({msg:"user tidak terdaftar"})
    let newPassword;
    if(password == null || password == ""){
      newPassword=user.password
    }else{
      newPassword=passwordHash.generate(password)
    }
    
    if(password !== confPassword)
    return res.status(400).json({msg:"password dan confirm password tidak cocok"})
    await User.update({name:name,email:email,password:newPassword},{
      where:{
        id:user.id
      }
    })
    res.status(201).json({msg:"update berhasil"})
  }catch(err){
    res.status(500).json({msg:err.message})
  }
}

export const deleteUser=async(req,res)=>{
  const user = await User.findOne({
    where:{
      id:req.params.id
    }
  })
  if(!user)
  return res.sratus(404).json({msg:"user tidak ditemukan"})
  try{
    await User.destroy({
      where:{
        id:user.id
      }
    })
    res.status(200).json({msg:"berhasil menghapus user"})
  }catch(err){
    res.status(500).json({msg:err.message})
  }
}