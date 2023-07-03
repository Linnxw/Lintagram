import Profile from "../models/profileModels.js"
import User from "../models/userModels.js"
import path from "path"
import {Op} from "sequelize"
import fs from "fs"
export const getAllProfile=async(req,res)=>{
  try{
    const profile=await Profile.findAll()
    res.status(200).json(profile)
  }catch(err){
    res.status(500).json({msg:err.message})
  }
}

export const getProfileById=async(req,res)=>{
  try{
    const profile=await Profile.findOne({
      where:{
        id:req.params.id
      }
    })
    if(!profile)
    return res.status(404).json({msg:"tidak ada profile terkait"})
    res.status(200).json(profile)
  }catch(err){
    res.status(500).json({msg:err.message})
  }
}

export const createProfile=async(req,res)=>{
  if(!req.files)
  return res.status(400).json({msg:"tidak ada image dipilih"})
  
  const file=req.files.file
  const ext=path.extname(file.name)
  const size=file.length
  const fileName=file.md5+ext
  const allowedType=[".jpg",".png",".jpeg"]
  const url=`${req.protocol}://${req.get("host")}/profile/${fileName}`
  
  if(!allowedType.includes(ext.toLowerCase()))
  return res.status(400).json({msg:"image tidak valid"})
  
  if(size > 5000000)
  return res.status(400).json({msg:"size terlalu besar"})
  
  file.mv(`./public/profile/${fileName}`,async(err)=>{
    if(err)
    return res.status(500).json({msg:err.message})
    const user=await User.findOne({
      where:{
        email:req.email
      }
    })
    await Profile.create({
      me:req.body.me,
      url:url,
      image:fileName,
      userId:user.id
    })
    res.status(200).json({msg:"succes add foto profile"})
  })
}

export const updateProfile=async(req,res)=>{
  const profile=await Profile.findOne({
    where:{
      id:req.params.id
    }
  })
  if(!profile)
  return res.status(404).json({msg:"data tidak ditemukan"})
  const me=req.body.me
  let fileName;
  if(req.files === null){
    fileName=profile.image
  }else{
    const file=req.files.file
    const ext=path.extname(file.name)
    fileName=file.md5+ext
    const size=file.data.length
    const allowedType=[".png",".jpg",".jpeg"]
    
    if(!allowedType.includes(ext.toLowerCase()))
    return res.status(400).json({msg:"image tidak valid"})
    if(size>5000000)
    return res.status(400).json({msg:"size terlalu besar"})
    fs.unlinkSync(`./public/profile/${profile.image}`)
  file.mv(`./public/profile/${fileName}`,(err)=>{
    if(err){
      console.log(err)
      return res.status(500).json({msg:err.message})
    }
  })
  }
  try{
    const newUrl=`${req.protocol}://${req.get("host")}/profile/${fileName}`

    await Profile.update({me:me,url:newUrl,image:fileName},{
      where:{
        id:profile.id
      }
    })
   res.status(200).json({msg:"succes"})
  }catch(err){
    return res.status(500).json({msg:err.message})
   }
  }


export const deleteProfile=async(req,res)=>{
  const profile=await Profile.findOne({
    where:{
      id:req.params.id
    }
  })
  if(!profile)
  return res.status(404).json({msg:"data tidak terdaftar"})
  
  try{
    fs.unlinkSync(`./public/profile/$${profile.image}`);
    await Profile.destroy({
      where:{
        id:profile.id
      }
    }) 
    return res.status(200).json({msg:"succes mengahapus data"})
  }catch(err){
    return res.status(500).json({msg:err.message})
  }
}