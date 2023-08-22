import Layout from "../component/Layout"
import {useState} from "react"
import {AiOutlineCloudUpload} from "react-icons/ai"
import {IoMdClose} from "react-icons/io"
import Axios from "../config/axios"
import {useNavigate} from "react-router-dom"
export default function AddPost(){
  const [title,setTitle]=useState("")
  const [file,setFile]=useState(null)
  const [url,setUrl]=useState(null)
  const [err,setErr]=useState("")
  const navigate=useNavigate()
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    
    const form=new FormData()
    form.append("file",file)
    form.append("title",title)
    try{
      const {data}=await Axios.get("/token",{
        withCredentials:true
      })
      const token=data.accesToken
      addPost(token,form)
    }catch(err){
      console.log(err)
    }
  }
  
  const addPost=async(token,form)=>{
    try{
      const {data}=await Axios.post("/post",form,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      navigate("/dashboard")
    }catch(err){
      if(err.response){
        setErr(err.response.data.msg)
      }
    }
  }
  
  const handleFile=({target})=>{
    const image=target.files[0]
    setFile(image)
    setUrl(URL.createObjectURL(image))
  }
  return (
    <Layout>
    <div className="w-screen h-screen bg-primary flex flex-col items-center justify-center font-inter text-white gap-3 md:gap-6">
      <div className="text-3xl md:text-5xl font-kaushan">
       <h1>Linstagram</h1>
      </div>
      <p className="md:text-xl">{err}</p>
      <form className="flex font-inter flex-col gap-5 md:gap-10 text-textSecond" onSubmit={handleSubmit}>
       <div>
        <textArea onChange={({target})=>setTitle(target.value)} placeholder="Input title (optional)" className="bg-second w-80 rounded p-3 font-inter outline-none text-sm md:w-[500px] md:p-6 md:text-xl tracking-wide"/>
       </div>
       <div className="relative flex flex-col items-center justify-center w-80 h-52 md:h-96 md:w-[500px] bg-second overflow-hidden rounded relative" onClick={()=>document.querySelector(".file").click()}>
       {
         url ? (
         <>
         <span 
         onClick={()=>{
          setUrl(null)
          setFile(null)}} 
         className="absolute right-2 top-2 text-2xl"><IoMdClose/></span>
         <img src={url} className="object-contain h-full"/>
         </>
         ) : (
         <>
         <span className="text-5xl"><AiOutlineCloudUpload/></span>
         <p>Upload image</p>
         <input type="file" className="file bg-second rounded font-inter tracking-wide" onChange={handleFile} hidden/>
         </>
         )
       }
       </div>
       <button className={`${file ? "bg-bluePrimary text-white" : "bg-blueSecond" } py-4 rounded`}>Upload</button>
      </form>
    </div>
    </Layout>
    )
}