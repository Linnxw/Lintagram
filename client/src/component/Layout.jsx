import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import {useState} from "react"
export default function Layout({children}){
  const [isOpen,setIsOpen]=useState(false)
  
  return (
    <div className="w-screen overflow-hidden">
    <Sidebar open={isOpen} handleOpen={()=>setIsOpen(state=>!state)}/>
    <Navbar handleOpen={()=>setIsOpen(state=>!state)}/>
    {children}
    </div>
    )
}