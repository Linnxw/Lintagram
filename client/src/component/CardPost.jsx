import {AiOutlineHeart} from "react-icons/ai"
import {AiFillHeart} from "react-icons/ai"
import {TbMessageCircle2} from "react-icons/tb"
import {TbMessageReport} from "react-icons/tb"
import {FaTelegramPlane} from "react-icons/fa"
import {BsEyeSlashFill} from "react-icons/bs"
import Button from "../component/Button"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios"
export default function CardPost(props){
  const {name,fotoProfile,hide,report,id,postImage,title,filter=true,action=false,getPost}=props
  const [open,setOpen]=useState(false)
  const [like,setLike]=useState(false)
  const navigate=useNavigate()
  
  const deletePost=async()=>{
    try{
    const {token}=await getToken()
    const response=await axios.delete(`http://localhost:3000/post/${id}`,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    getPost()
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Berhasil menghapus',
      showConfirmButton: false,
      timer: 1500
    })
    }catch(err){
      console.log(err)
    }
  }
  
  const editPost=()=>{
    navigate(`/edit/${id}`)
  }
  
  const getToken=async()=>{
    try{
      const {data}=await axios.get("http://localhost:3000/token",{
        withCredentials:true
      })
      return {token:data.accesToken}
    }catch(err){
      console.log(err)
    }
  }
  return (
    <>
   <div className="w-full border-t border-second overflow-hidden md:w-[600px]">
      <div className="w-full flex items-center md:h-24 justify-between pr-4 h-14">
        <div className="w-4/5 h-full items-center justify-start gap-3 md:px-6 px-3 flex">
          <div className="w-9 rounded-full h-9 md:h-16 md:w-16 flex items-center justify-center overflow-hidden">
            <img src={fotoProfile} alt="foto profile" className="w-full h-full object-cover"/>
          </div>
          <div>
           <h1 className="font-inter tracking-wide md:text-2xl text-white">{name}</h1>
          </div>
        </div>
        <div className="flex items-center justify-end">
        {
        filter && (
         <div className="flex flex-col items-end justify-center gap-1 h-full w-11" onClick={()=>setOpen(state=>!state)}>
          <span className="w-1 h-1 rounded-full bg-white"></span>
          <span className="w-1 h-1 rounded-full bg-white"></span>
          <span className="w-1 h-1 rounded-full bg-white"></span>
         </div>
         )
        }
        </div>
      </div>
      <div className="relative w-full h-[450px] md:h-[800px]">
      <div className={`${!open ? "w-0 h-0 opacity-0" : "w-48 h-24"} absolute top-2 right-2 bg-second rounded text-white text-[.8rem] ease-in-out duration-200 transition-all flex flex-col items-center justify-evenly overflow-hidden`}>
       <div onClick={()=>hide(id)} className="w-full flex items-center justify-start  p-2 hover:text-second hover:bg-textSecond transition-all ease-in-out duration-300 gap-2">
       <span className="text-lg"><BsEyeSlashFill/></span>
        <p>Sembunyikan postingan</p>
       </div>
       <div onClick={()=>report(id)} className="w-full flex items-center justify-start p-2 hover:text-second hover:bg-textSecond text-bgError transition-all ease-in-out duration-300 gap-2">
       <span className="text-lg"><TbMessageReport/></span>
        <p>Laporkan postingan</p>
       </div>
      </div>
        <img src={postImage} alt="post iamage" className="w-full h-full object-cover"/>
      </div>
      
      <div className="px-3 md:px-6 md:py-8 py-4 flex items-center justify-start gap-3 w-full md:text-4xl text-3xl h-[50px]">
        <span onClick={()=> setLike(state=>!state)} className={`${like ? "text-bgError" : "text-white"} active:scale-110 ease-in-out duration-300`}>
         {
           like ? <AiFillHeart/> :         <AiOutlineHeart/>
         }
        </span>
        <span className="text-white"><TbMessageCircle2/></span>
        <span className="text-white"><FaTelegramPlane/></span>
      </div>
      <div className="text-white md:p-4 md:text-xl font-poppin p-2">
        <p>{title}</p>
      </div>
   </div>
   {
     action && (
   <div className="w-full md:w-[600px] flex justify-evenly">
     <Button event={editPost} variant="bg-bluePrimary" size="h-10">Edit</Button>
     <Button event={deletePost} variant="bg-bgError" size="h-10">Delete</Button>
   </div>
   )
   }
   </>
    )
}