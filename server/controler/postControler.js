import Post from "../models/postModels.js"
import User from "../models/userModels.js"
import Profile from "../models/profileModels.js"
import {Op} from "sequelize"
import path from "path"
import fs from "fs"
export const getAllPost=async(req,res)=>{
 try{
  const post=await Post.findAll({
    attributes:['id','title','url','path','userId'],
    include:[{
      model:User,
      attributes:['name','email','role'],
      include:[{
        model:Profile,
        attributes:['me','url','image']
      }]
      }]
  })
  res.status(200).json(post)
 }catch(err){
   res.status(500).json({msg:err.message})
 }
}

export const getPostById=async(req,res)=>{
 try{
  const post=await Post.findOne({
    where:{
      id:req.params.id
    },
    attributes:['id','title','url','path','userId']
  })
  res.status(200).json(post)
 }catch(err){
   res.status(500).json({msg:err.message})
 }
}
export const createPost=async(req,res)=>{
if(req.files === null)
return res.status(400).json({msg:'tidak ada file yg dipilih'})

const file=req.files.file
const title=req.body.title
const fileSize=file.data.length
const ext=path.extname(file.name)
const allowed=['.png','.jpg','.jpeg']
const fileName=file.md5 + ext
const url=`${req.protocol}://${req.get('host')}/post/${fileName}`
 
if(!allowed.includes(ext.toLowerCase()))
return res.status(400).json({msg:"hanya dapat mengirim image"})

if(fileSize > 5000000)
 return res.status(400).json({msg:"size terlalu besar"})
 
 file.mv(`./public/post/${fileName}`,async(err)=>{
   if(err)
   return res.status(500).json({msg:err.message})
   const user=await User.findOne({
     where:{
       email:req.email
     }
   })
   await Post.create({title:title,path:fileName,url:url,userId:user.id})
   res.status(200).json({msg:"succes"})
 })
}

export const updatePost=async(req,res)=>{
  const title=req.body.title
  
  const post=await Post.findOne({
    where:{
      id:req.params.id
    }
  })
  if(!post)
  return res.status(404).json({msg:"postingan tidak ditemukan"})
  let newPath;
  if(req.files === null){
    newPath=post.path
  }else{
    const file=req.files.file
    const ext=path.extname(file.name)
    newPath=file.md5+ext
    const fileSize=file.data.length
    const allowType=['.png','.jpg','.jpeg']
    
    if(!allowType.includes(ext.toLowerCase()))
    return res.status(422).json({msg:"image tidak valid"})
    if(fileSize >5000000)
    return res.status(422).json({msg:"size terlalu besar"})
    fs.unlinkSync(`./public/post/${post.path}`)
    file.mv(`./public/post/${newPath}`,(err)=>{
   if(err)
    return res.status(500).json({msg:err.message})
    }
   )
  }
  const url=`${req.protocol}://${req.get("host")}/post/${newPath}`
  try{
    await Post.update({title:title,url:url,path:newPath},{
      where:{
        id:post.id
      }
    })
   res.json({msg:"succes"})
  }catch(err){
    return res.status(500).json({msg:err.message})
  }
}

export const deletePost=async(req,res)=>{
  const post=await Post.findOne({
    where:{
      id:req.params.id
    }
  })
  if(!post)
  return res.status(404).json({msg:"potingan tidak ditemukan"})
  const pathLoc=`./public/post/${post.path}`
  try{
    await Post.destroy({where:{
      id:post.id
    }})
    fs.unlinkSync(pathLoc)
    res.status(200).json({msg:"berhasil menghapus postingan"})
  }catch(err){
    res.status(500).json({msg:err.message})
  }
}

export const myPost=async(req,res)=>{
  const user=await User.findOne({
    where:{
      email:req.email
    }
  })
  try{
    const post = await Post.findAll({
      include:[{
        model:User,
        attributes:['id','name','email','role'],
        include:[{
          model:Profile,
          attributes:['id','me','url','image']
        }]
      }],
      attributes:['id','title','url','path'],
      where:{
        userId:user.id
      }
    })
    if(!post)
    return res.status(200).json({msg:"anda tidak mempunyai postingan"})
    res.status(200).json(post)
  }catch(err){
    res.status(500).json({msg:err.message})
  }
}

export const getSearchPost=async(req,res)=>{
  try{
    const post=await Post.findAll({
      include:[{
        model:User,
        attributes:['id','name','email','role'],
        include:[{
          model:Profile,
          attributes:['id','me','url','image']
        }]
      }],
      attributes:['id','title','url','path'],
      where:{
        title:{
        [Op.like]:`%${req.params.title}%`
        }
      }
    })
    if(post.length === 0)
    return res.status(404).json({msg:"postingan tidak ditemukan"})
    return res.status(200).json(post)
  }catch(err){
    console.log(err)
    res.status(500).json(err.message)
  }
}