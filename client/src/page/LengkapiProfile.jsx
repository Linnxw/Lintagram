import Layout from "../component/Layout"
import {useState} from "react"
import {AiOutlineCloudUpload} from "react-icons/ai"
import {IoMdClose} from "react-icons/io"
import axios from "axios"
import {useNavigate} from "react-router-dom"
export default function LengkapiProfile(){
  const [me,setMe]=useState("")
  const [file,setFile]=useState(null)
  const [url,setUrl]=useState(null)
  const [err,setErr]=useState("")
  const navigate=useNavigate()
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const form=new FormData()
    form.append("file",file)
    form.append("me",me)
    if(me.length > 1 && file){
    try{
      const {data}=await axios.get("http://localhost:3000/token",{
        withCredentials:true
      })
      
      const token=data.accesToken
      postProfile(token,form)
    }catch(err){
      console.log(err)
    }
    }
  }
  
  const postProfile=async(token,form)=>{
    try{
      const response=await axios.post("http://localhost:3000/profile",form,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      navigate("/akun")
    }catch(err){
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
    <div className="w-screen h-screen bg-primary flex flex-col items-center justify-center text-white gap-3">
      <div className="text-3xl font-kaushan">
       <h1>Linstagram</h1>
      </div>
      <p>{err}</p>
      <form className="flex font-inter flex-col gap-5 text-textSecond" onSubmit={handleSubmit}>
       <div>
        <textArea onChange={({target})=>setMe(target.value)} placeholder="masukan informasi tentang dirimu" className="bg-second w-80 rounded p-3 font-inter outline-none text-sm tracking-wide"/>
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
         <p>Unggah foto profile</p>
         <input type="file" className="file bg-second rounded w-80 p-3 font-inter outline-none text-sm tracking-wide" onChange={handleFile} hidden/>
         </>
         )
       }
       </div>
       <button className={`${me?.length > 0 && file ? "bg-bluePrimary text-white" : "bg-blueSecond" } py-4 rounded`}>Simpan</button>
      </form>
    </div>
    </Layout>
    )
}