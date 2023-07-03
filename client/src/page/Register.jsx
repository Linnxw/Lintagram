import {BsEyeFill} from "react-icons/bs"
import {BsEyeSlashFill} from "react-icons/bs"
import axios from "axios"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
export default function Register(){
  const [show,setShow]=useState(false)
  const [msg,setMsg]=useState("")
  const [data,setData]=useState({
    name:"",
    email:"",
    password:"",
    confPassword:"",
    role:"",
  })
  const navigate=useNavigate()
  
  const register=async(token)=>{
   try{
    const response=await axios.post("http://localhost:3000/user",{
     name:data.name,
     email:data.email,
     password:data.password,
     confPassword:data.confPassword,
     role:data.role
    },{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    if(response.status === 201){
      navigate("/")
    }
    }catch(err){
      console.log(err)
      if(err.response){
        setMsg(err.response.data.msg)
      }
    }
  }
  
  const handleRegister=async(e)=>{
    e.preventDefault()
    try{
    if(data.role === ""){
      setData({...data,role:"user"})
    }
    const {data}=await axios.get("http://localhost:3000/token",{
      withCredentials:true
    })
    register(data.accesToken)
  }catch(err){
    console.log(err)
  }
  }
  return (
    <div className="w-screen h-screen bg-primary flex flex-col items-center justify-center text-white gap-3">
      <div className="text-3xl font-kaushan">
       <h1 onClick={()=>console.log(data)}>Linstagram</h1>
      </div>
      <p>{msg}</p>
      <form className="flex font-inter flex-col gap-5 text-textSecond" onSubmit={handleRegister}>
       <div>
        <input type="name" placeholder="masukan nama" className="bg-second w-80 rounded p-3 font-inter outline-none text-sm tracking-wide" onChange={({target})=>setData({...data,name:target.value})}/>
       </div>
       <div>
        <input type="email" placeholder="masukan email" className="bg-second w-80 rounded p-3 font-inter outline-none text-sm tracking-wide" onChange={({target})=>setData({...data,email:target.value})}/>
       </div>
       <div className="relative flex items-center">
        <input type={show ? "teks" :"password"} placeholder="masukan password" className="bg-second rounded w-80 p-3 font-inter outline-none text-sm tracking-wide" onChange={({target})=>setData({...data,password:target.value})}/>
        <span onClick={()=>setShow(s=>!s)} className="absolute text-xl hover:bg-slate-700 p-2 rounded-full right-1">
          {show ? <BsEyeSlashFill/> : <BsEyeFill/>}
        </span>
       </div>
       <div className="relative flex items-center">
        <input type={show ? "teks" :"password"} placeholder="confirm password password" className="bg-second rounded w-80 p-3 font-inter outline-none text-sm tracking-wide" onChange={({target})=>setData({...data,confPassword:target.value})}/>
        <span onClick={()=>setShow(s=>!s)} className="absolute text-xl hover:bg-slate-700 p-2 rounded-full right-1">
          {show ? <BsEyeSlashFill/> : <BsEyeFill/>}
        </span>
       </div>
       <div>
         <select className="w-80 bg-second p-3 outline-none rounded" onChange={({target})=>setData({...data,role:target.value})}>
           <option>user</option>
           <option>admin</option>
         </select>
       </div>
       <button className={`${data.email.length > 8 && data.password.length > 3 && data.confPassword.length > 3 && data.name.length > 1 ? "bg-bluePrimary text-white" : "bg-blueSecond" } py-4 rounded`}>Masuk</button>
      </form>
    </div>
    )
}