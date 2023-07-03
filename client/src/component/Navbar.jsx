import {useNavigate} from "react-router-dom"
export default function Navbar({handleOpen}){
  const navigate=useNavigate()
  return (
    <div className="w-screen static z-10 h-16 flex justify-between items-center text-white bg-black px-3 md:h-28">
      <div className="font-kaushan md:text-4xl text-2xl">Linstagram</div>
      <div className="w-7 md:hidden h-9 flex flex-col items-center justify-evenly" onClick={handleOpen}>
       <span className="h-[3px] w-full rounded bg-white"></span>
       <span className="h-[3px] w-full rounded bg-white"></span>
       <span className="h-[3px] w-full rounded bg-white"></span>
      </div>
      
      <div className="w-1/2 h-full font-inter hidden md:inline-block px-3">
      <div className="w-full h-full flex items-center tracking-wide gap-14 justify-end text-xl">
        <div onClick={()=>navigate("/dashboard")} className="hover:-translate-y-1 ease-in-out duration-200">Dashboard</div>
        <div onClick={()=>navigate("/social")} className="hover:-translate-y-1 ease-in-out duration-200">Social</div>
        <div onClick={()=>navigate("/akun")} className="hover:-translate-y-1 ease-in-out duration-200">Akun</div>
       </div>
      </div>
    </div>
  )
}