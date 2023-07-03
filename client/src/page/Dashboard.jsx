import Layout from "../component/Layout"
import {useState,useEffect} from "react"
import jwt_decode from "jwt-decode"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import CardPost from "../component/CardPost"
import {BsPlusSquareFill} from "react-icons/bs"
export default function Dashboard(){
  const [name,setName]=useState("")
  const [expire,setExpire]=useState("")
  const [token,setToken]=useState("")
  const [post,setPost]=useState([])
  const [role,setRole]=useState("")
  const navigate=useNavigate()
  
  useEffect(()=>{
   getToken()
  },[])

  const axiosToken=axios.create()
  
  axiosToken.interceptors.request.use(async(config)=>{
    const current=new Date()
    if(expire * 1000 < current.getTime()){
     const {data}=await axios.get("http://localhost:3000/token",{
     withCredentials:true
    })
     config.headers.Authorization = `Bearer ${data.accesToken}`
    
     setToken(data.accesToken)
     const decode=jwt_decode(data.accesToken)
     setName(decode.name)
     setRole(decode.role)
     setExpire(decode.exp)
    }
    return config
  },(err)=>{
    return Promise.reject(err)
  })
  
  
 const getToken=async()=>{
   try{
  const {data}=await axiosToken.get("http://localhost:3000/token",{
    withCredentials:true
  })
    setToken(data.accesToken)
    const decode=jwt_decode(data.accesToken)
    setName(decode.name)
    setExpire(decode.exp)
    setRole(decode.role)
    if(decode.role === "user"){
      getPost()
    }else{
      getAllPost()
    }
   }catch(err){
     if(err.response){
       navigate("/")
     }
   }
}
  
  const getPost=async()=>{
    try{
      const {data}=await axiosToken.get("http://localhost:3000/post/me",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setPost(data)
    }catch(err){
      console.log(err)
    }
  }
  
const getAllPost=async()=>{
    try{
      const {data}=await axiosToken.get("http://localhost:3000/post",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setPost(data)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <Layout>
    <div className="bg-primary text-white font-inter min-h-screen w-screen">
     <div className="p-3 md:p-5 flex flex-col gap-y-3 text-xl md:text-4xl tracking-wide">
      <h1 className="text-white">{`Welcome in dashbord ${name}`}</h1>
      <p className="text-bluePrimary text-md font-poppin">Handle your post in here</p>
     </div>
     <div className="w-full flex flex-col gap-y-4 md:items-center">
       {
         post?.map(m=>{
           return <CardPost 
           key={m.id} 
           filter={false} 
           id={m.id} 
           action={true} 
           name={m.user.name} 
           fotoProfile={m.user.profile.url}
           title={m.title} 
           postImage={m.url} 
           getPost={getPost}/>
         })
       }
     </div>
      <div className="w-screen py-5 flex flex-col justify-center items-center">
       <span onClick={()=>navigate("/add-post")} className="text-4xl hover:text-slate-400"><BsPlusSquareFill/></span>
      </div>
    </div>
    </Layout>
    )
}