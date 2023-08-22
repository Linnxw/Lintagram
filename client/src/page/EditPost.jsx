import Layout from "../component/Layout"
import {useState} from "react"
import {AiOutlineCloudUpload} from "react-icons/ai"
import {IoMdClose} from "react-icons/io"
import Axios from "../config/axios"
import {useNavigate,useParams} from "react-router-dom"
export default function EditPost(){
  const [title,setTitle]=useState("")
  const [file,setFile]=useState(null)
  const [url,setUrl]=useState(null)
  const [err,setErr]=useState("")
  const navigate=useNavigate()
  const {id}=useParams()
  
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
      editPost(token,form)
    }catch(err){
      console.log(err)
    }
  }
  
  const editPost=async(token,form)=>{
    try{
      const response=await Axios.patch(`/post/${id}`,form,{
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
    <div className="w-screen h-screen bg-primary flex flex-col items-center justify-center font-inter text-white gap-3">
      <div className="text-3xl font-kaushan">
       <h1>Linstagram</h1>
      </div>
      <p>{err}</p>
      <form className="flex font-inter flex-col gap-5 text-textSecond" onSubmit={handleSubmit}>
       <div>
        <textArea onChange={({target})=>setTitle(target.value)} placeholder="Input title (optional)" className="bg-second w-80 rounded p-3 font-inter outline-none text-sm tracking-wide"/>
       </div>
       <div className="relative flex flex-col items-center justify-center w-80 h-52 bg-second overflow-hidden rounded relative" onClick={()=>document.querySelector(".file").click()}>
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
         <p>Edit image</p>
         <input type="file" className="file bg-second rounded w-80 p-3 font-inter outline-none text-sm tracking-wide" onChange={handleFile} hidden/>
         </>
         )
       }
       </div>
       <button className="bg-bluePrimary text-white py-4 rounded">Edit</button>
      </form>
    </div>
    </Layout>
    )
}