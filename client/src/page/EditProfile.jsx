import Layout from "../component/Layout"
import {useState,useEffect} from "react"
import {AiOutlineCloudUpload} from "react-icons/ai"
import {IoMdClose} from "react-icons/io"
import axios from "axios"
import {useNavigate,useParams} from "react-router-dom"
export default function EditProfile(){
  const [me,setMe]=useState("")
  const [file,setFile]=useState(null)
  const [url,setUrl]=useState(null)
  const [err,setErr]=useState("")
  const navigate=useNavigate()
  const {id}=useParams()
 
  useEffect(()=>{
    getToken()
  },[])
  
  const getToken=async()=>{
    try{
      const {data}=await axios.get("http://localhost:3000/token",{
        withCredentials:true
      })
      getMyProfile(data.accesToken)
    }catch(err){
      console.log(err)
    }
  }
  
  const getMyProfile=async(token)=>{
    try{
      const {data}=await axios.get(`http://localhost:3000/profile/${id}`,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      setMe(data.me)
    }catch(err){
      console.log(err)
    }
  }
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const form=new FormData()
    form.append("file",file)
    form.append("me",me)
    if(me.length > 1){
    try{
      const {data}=await axios.get("http://localhost:3000/token",{
        withCredentials:true
      })
      const token=data.accesToken
      editProfile(token,form)
    }catch(err){
      console.log(err)
    }
    }
  }
  
  const editProfile=async(token,form)=>{
    try{
      const response=await axios.patch(`http://localhost:3000/profile/${id}`,form,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      navigate("/akun")
    }catch(err){
      console.log(err)
      if(err.response){
        setErr(err.response.data.msg)
      }
    }
  }
  
  const handleFile=(e)=>{
    const image=e.target.files[0]
    setFile(image)
    setUrl(URL.createObjectURL(image))
  }
  return (
    <Layout>
    <div className="w-screen h-screen bg-primary flex flex-col items-center justify-center text-white gap-3 md:gap-6">
      <div className="text-3xl md:text-5xl font-kaushan">
       <h1>Linstagram</h1>
      </div>
      <p className="md:text-xl">{err}</p>
      <form className="flex font-inter flex-col gap-5 md:gap-8 text-textSecond" onSubmit={handleSubmit}>
       <div>
        <textarea value={me} onChange={({target})=>setMe(target.value)} placeholder="Input info about yourself" className="bg-second w-80 rounded p-3 font-inter outline-none text-sm md:w-[500px] md:p-6 md:text-xl tracking-wide"/>
       </div>
       <div className="relative flex flex-col items-center justify-center w-80 h-52 md:h-96 md:w-[500px] bg-second overflow-hidden rounded relative" onClick={()=>document.querySelector(".file").click()}>
       {
         url ? (
         <>
         <span onClick={()=>{
           setUrl(null)
           setFile(null)}} 
         className="absolute right-2 top-2 text-2xl"><IoMdClose/></span>
         <img src={url} className="object-contain h-full"/>
         </>
         ) : (
         <>
         <span className="text-5xl"><AiOutlineCloudUpload/></span>
         <p>Edit Photo</p>
         <input type="file" className="file bg-second rounded font-inter" onChange={handleFile} hidden/>
         </>
         )
       }
       </div>
       <button className={`${me?.length > 0 ? "bg-bluePrimary text-white" : "bg-blueSecond" } py-4 rounded`}>Edit</button>
      </form>
    </div>
    </Layout>
    )
}