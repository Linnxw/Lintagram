import express from "express"
import {getAllProfile,getProfileById,createProfile,deleteProfile,updateProfile} from "../controler/profileControler.js"
import {verifyLogin,verifyAdmin} from "../middleware/verify.js"
const router=express.Router()

router.get("/profile",verifyLogin,getAllProfile)
router.get("/profile/:id",verifyLogin,getProfileById)
router.post("/profile",verifyLogin,createProfile)
router.patch("/profile/:id",verifyLogin,updateProfile)
router.delete("/profile/:id",verifyLogin,deleteProfile)

export default router