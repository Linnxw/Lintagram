import {Routes,Route} from "react-router-dom"
import Login from "./page/Login"
import Register from "./page/Register"
import Dashboard from "./page/Dashboard"
import Social from "./page/Social"
import Akun from "./page/Akun"
import AddPost from "./page/AddPost"
import EditPost from "./page/EditPost"
import LengkaiProfile from "./page/LengkapiProfile"
import EditProfile from "./page/EditProfile"
function App() {
   return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/social" element={<Social/>}/>
      <Route path="/akun" element={<Akun/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/lengkapi-profile" element={<LengkaiProfile/>}/>
      <Route path="edit-profile/:id" element={<EditProfile/>}/>
      <Route path="add-post" element={<AddPost/>}/>
      <Route path="/edit/:id" element={<EditPost/>}/>
    </Routes>
  )
}
export default App
