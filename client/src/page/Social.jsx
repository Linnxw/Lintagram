import Layout from "../component/Layout"
import Axios from "../config/axios"
import CardPost from "../component/CardPost"
import InputSearch from "../component/InputSearch"
import {useEffect,useState} from "react"
export default function Social(){
  const [search,setSearch]=useState("")
  const [post,setPost]=useState([])
  const [err,setErr]=useState("")
  useEffect(()=>{
    getAllPost()
  },[])
  
  const getAllPost=async()=>{
    const {data}=await Axios.get("/post")
    setPost(data)
    setErr("")
  }
  
  const searchPost=async()=>{
    try{
     const {data}=await Axios.get(`/post/search/${search}`)
     setPost(data)
     setErr("")
    }catch(err){
      setErr(err.response.data.msg)
      setPost([])
    }
  }
  
  const handleHide=(id)=>{
    const dataPost=[...post]
    const newPost=dataPost.filter(m=>m.id !== id)
    setPost(newPost)
  }
  const handleReport=(id)=>{
    const dataPost=[...post]
    const newPost=dataPost.filter(m=>m.id !== id)
    setPost(newPost)
  }
  const onKeyPress=(e)=>{
    if(e.key === "Enter"){
      if(search === ""){
        getAllPost()
      }else{
        searchPost()
     }
    }
  }

  const handleChange=(e)=>{
    setSearch(e.target.value)
  }
  
  return (
    <Layout>
     <div className="bg-primary w-screen min-h-screen flex flex-col md:items-center gap-y-2">
     <InputSearch press={onKeyPress} change={handleChange} state={search}/>
     {
         post?.map(m=>{
           return <CardPost 
           key={m.id} 
           name={m.user.name} 
           id={m.id} 
           hide={handleHide} 
           report={handleReport} 
           fotoProfile={m.user.profile.url}
           title={m.title} 
           postImage={m.url}/>
         })
     }
     <div className="w-screen pb-10 text-center">
       <h1 className="text-bluePrimary font-inter">{ err ? err :"Konten telah habis"}</h1>
     </div>
     </div>
    </Layout>
    )
}