import {BsEyeFill} from "react-icons/bs"
import {BsEyeSlashFill} from "react-icons/bs"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useState,useEffect} from "react"
export default function Login(){
  const [show,setShow]=useState(false)
  const [email,setEmail]=useState("")
  const [err,setErr]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()
 
  const handleLogin=async(e)=>{
    e.preventDefault()
   try{
   const response= await axios.post("http://localhost:3000/login",{
     email:email,
     password:password
     
   },{
      withCredentials:true
    })
    if(response.status === 200){
      navigate("/dashboard")
    }
  }catch(err){
    if(err.response){
      setErr(err.response.data.msg)
    }
  }
  }
  return (
    <div className="w-screen h-screen bg-primary flex flex-col items-center justify-center text-white gap-3">
      <div className="text-3xl font-kaushan">
       <h1>Linstagram</h1>
      </div>
      <p>{err}</p>
      <form className="flex font-inter flex-col gap-5 text-textSecond" onSubmit={handleLogin}>
       <div>
        <input type="email" placeholder="masukan email" className="bg-second w-80 rounded p-3 font-inter outline-none text-sm tracking-wide" onChange={({target})=>setEmail(target.value)}/>
       </div>
       <div className="relative flex items-center">
        <input type={show ? "teks" :"password"} placeholder="masukan password" className="bg-second rounded w-80 p-3 font-inter outline-none text-sm tracking-wide" onChange={({target})=>setPassword(target.value)}/>
        <span onClick={()=>setShow(s=>!s)} className="absolute text-xl hover:bg-slate-700 p-2 rounded-full right-1">
          {show ? <BsEyeSlashFill/> : <BsEyeFill/>}
        </span>
       </div>
       <button className={`${email.length > 8 && password.length > 3 ? "bg-bluePrimary text-white" : "bg-blueSecond" } py-4 rounded`}>Masuk</button>
      </form>
    </div>
    )
}