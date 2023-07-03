import Layout from "../component/Layout"
import CardPost from "../component/CardPost"
import CardViewPost from "../component/CardViewPost"
import Button from "../component/Button"
import PopUp from "../component/PopUp"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {FaUserEdit} from "react-icons/fa"
import {RiUserSharedFill} from "react-icons/ri"
import jwt_decode from "jwt-decode"
import {useEffect,useState} from "react"
export default function Akun(){
  const [token,setToken]=useState("")
  const [exp,setExp]=useState("")
  const [id,setId]=useState(null)
  const [user,setUser]=useState({})
  const [open,setOpen]=useState(false)
  const [dataProfile,setDataProfile]=useState(false)
  const [url,setUrl]=useState(null)
  const navigate=useNavigate()
  
  useEffect(()=>{
     getToken()
  },[])
  
  useEffect(()=>{
    if(!user.profile){
      setDataProfile(true)
    }
    console.log(dataProfile)
  },[])
  
  const axiosToken=axios.create()
  
  axiosToken.interceptors.request.use(async(config)=>{
    const current=new Date()
    if(exp*1000 < current.getTime()){
    const {data}=await axios.get("http://localhost:3000/token",{
      withCredentials:true
    })
    config.headers.Authorization=`Bearer ${data.accesToken}`
    setToken(data.accesToken)
    const decode=jwt_decode(data.accesToken)
    setExp(decode.exp)
    setId(decode.id)
    }
    return config
  },(err)=>{
    return Promise.reject(err)
  })
  
  const getToken=async()=>{
    try{
     const {data}=await axiosToken.get("http://localhost:3000/token",{
      withCredentials:true
    })
     setToken(data.accesToken)
     const decode=jwt_decode(data.accesToken)
     setExp(decode.exp)
     setId(decode.id)
     getUser(data.accesToken,decode.id)
    }catch(err){
      if(err.response){
        navigate("/")
      }
    }
  }
  const getUser=async(token,id)=>{
    try{
      const {data}=await axiosToken.get("http://localhost:3000/user/"+id,{
         headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(data.profile){
        setDataProfile(false)
      }
      setUser(data)
    }catch(err){
      console.log(err)
    }
  }
 
 const handlePopUp=(url)=>{
   setOpen(true)
   setUrl(url)
 }
 
 const handleAction=()=>{
   if(dataProfile){
     navigate("/lengkapi-profile")
   }else{
     navigate("/edit-profile/"+user.profile.id)
   }
 }
 
 const closePopUp=()=>{
    setUrl(null)
    setOpen(false)
 }
  return (
    <Layout>
     <div className="bg-primary text-white font-inter w-screen min-h-screen">
      <div className="w-full h-24 md:h-37 md:px-10 flex justify-start items-center px-3">
        <div className="w-20 rounded-full h-20 md:w-28 md:h-28 flex items-center justify-center overflow-hidden">
          <img src={user?.profile?.url} alt="foto profile" className="w-full h-full object-cover"/>
        </div>
        <div className="px-3 pb-2 md:px-6 md:pb-4">
          <h1 className="font-inter text-xl md:text-3xl">{user?.name}</h1>
          <h1 className="font-inter italic text-[.7rem] text-slate-200 md:text-md">{user?.email}</h1>
        </div>
       </div>
       <div className="w-full p-3 md:py-6 md:px-10 md:text-lg text-[.8rem] font-inter">
         <p>{user?.profile?.me}</p>
       </div>
       <div className="w-full py -3 flex items-center justify-center gap-3">
         <Button event={handleAction} >
         <span className="text-lg"><FaUserEdit/></span>
         {dataProfile ? "Lengkapi":"Edit"} profile
         </Button>
         <Button>
         <span className="text-lg"><RiUserSharedFill/></span>
         Share profile</Button>
       </div>
       <div className="w-full min-h-full border-t border-second grid grid-cols-2 gap-1 my-3 px-1 md:grid-cols-3 md:px-10">
        {
          user?.posts?.map(m=>{ 
            return <CardViewPost 
            event={handlePopUp} 
            image={m.url}/>
          })
        }
       </div>
     </div>
     <PopUp 
     open={open} 
     profile={user?.profile?.url} 
     img={url} 
     event={closePopUp}
     name={user?.name}/>
    </Layout>
    )
}