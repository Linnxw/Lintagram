import axios from "axios"

const Axios=axios.create({
  baseURL:"https://lintagram.cyclic.cloud",
  headers:{
    'Content-Type':'Application/json'
  },
  withCredentials:true
})

export default Axios

