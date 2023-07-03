import {MdSpaceDashboard} from "react-icons/md"
import {HiCamera} from "react-icons/hi"
import {FaUser} from "react-icons/fa"
import {FiLogOut} from "react-icons/fi"
import {FiLogIn} from "react-icons/fi"
import {IoMdClose} from "react-icons/io"
import {useState,useEffect} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
export default function Sidebar({open,handleOpen}){
  const navigate=useNavigate()
  const logout=async()=>{
   try{
    const response=await axios.delete("http://localhost:3000/logout",{
      withCredentials:true
    })
    navigate("/")
  }catch(err){
    console.log("response reject",err)
  }
}
  
  return(
    <div className={`${open ? "left-0":"-left-2/3"} bg-second w-2/3 h-screen fixed flex ease-in-out duration-300 flex-col items-center z-20`}>
     <div className="font-kaushan md:text-4xl text-3xl flex justify-center items-center text-white w-full h-1/5 pt-10 relative">
      <span onClick={handleOpen} className="text-2xl absolute top-2 right-2"><IoMdClose/></span>
      <h1>Linstagram</h1>
     </div>
     
     <div className="w-full h-3/5 flex flex-col pl-5 text-xl text-white font-semibold font-inter gap-10 justify-center">
      <div className="flex ease-in-out duration-200 hover:translate-x-2 items-center gap-2" onClick={()=>navigate("/dashboard")}>
       <span><MdSpaceDashboard/></span>
       <p>Dashboard</p>
      </div>
      <div className="flex ease-in-out duration-200 hover:translate-x-2 items-center gap-2" onClick={()=>navigate("/social")}>
       <span><HiCamera/></span>
       <p>Social</p>
      </div>
      <div className="flex ease-in-out duration-200 hover:translate-x-2 items-center gap-2" onClick={()=>navigate("/akun")}>
       <span><FaUser/></span>
       <p>Akun</p>
      </div>
     </div>
     
     <div className="flex items-center justify-end items-end w-full h-1/5 p-3 font-inter text-[.8rem] text-white">
      <div className="flex items-center gap-2" onClick={logout}>
       <span><FiLogOut/></span>
       <p>Logout</p>
      </div>
     </div>
     
    </div>
    )
}