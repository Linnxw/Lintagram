import {IoMdClose} from "react-icons/io"
import {AiOutlineHeart} from "react-icons/ai"
import {AiFillHeart} from "react-icons/ai"
import {TbMessageCircle2} from "react-icons/tb"
import {FaTelegramPlane} from "react-icons/fa"
import {useState} from "react"
export default function PopUp({event,open,img,profile,name}){
  const [like,setLike]=useState(false)
  return (
    <div className={`${open ? "w-screen top-0 h-full" : "top-0 opacity-0 w-0 h-0"} absolute bg-black/30 backdrop-blur-lg flex items-center transition-all ease-in-out duration-300 justify-center text-white font-inter`}>
      <div className={`${open ? "w-72 md:w-[650px]" : "w-0 h-0 opacity-0 translate-x-20 translate-y-20"} transition-all ease-in-out duration-300 overflow-hidden rounded text-center text-white`}>
       <div className="bg-second w-full h-10 justify-between flex md:h-20">
         <div className="gap-2 md:gap-6 md:px-6 px-2 flex items-center">
           <div className="w-8 h-8 md:w-16 md:h-16 rounded-full overflow-hidden flex items-center justify-center">
            <img src={profile} className="object-cover h-full"/>
           </div>
           <div className="flex items-center text-sm md:text-2xl">
            <p>{name}</p>
           </div>
         </div>
          <div className="h-full flex items-center w-10 md:w-16 md:text-4xl text-xl" onClick={event}>
           <span><IoMdClose/></span>
          </div>
       </div>
       <div className="w-full h-72 md:h-[700px] overflow-hidden">
         <img src={img} className="object-cover w-full"/>
       </div>
       <div className="bg-second w-full md:h-20 h-10 justify-start text-xl md:text-5xl gap-3 px-3 md:gap-8 md:px-8 items-center flex">
        <span onClick={()=> setLike(state=>!state)} className={`${like ? "text-bgError" : "text-white"} active:scale-110 ease-in-out duration-300`}>
         {
           like ? <AiFillHeart/> :         <AiOutlineHeart/>
         }
        </span>
        <span className="text-white"><TbMessageCircle2/></span>
        <span className="text-white"><FaTelegramPlane/></span>
       </div>
      </div>
    </div>
    )
}