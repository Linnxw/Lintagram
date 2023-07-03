import express from "express";
import {getAllUser,getUserById,createUser,updateUser,deleteUser} from "../controler/userControler.js";
import {verifyLogin,verifyAdmin} from "../middleware/verify.js"
const router=express.Router()

router.get("/user",verifyLogin,verifyAdmin,getAllUser)
router.get("/user/:id",verifyLogin,getUserById)
router.post("/user",verifyLogin,verifyAdmin,createUser)
router.patch("/user/:id",verifyLogin,updateUser)
router.delete("/user/:id",verifyLogin,deleteUser)

export default router