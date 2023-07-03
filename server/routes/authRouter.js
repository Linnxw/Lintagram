import express from "express";
import {login,logout,Me,refreshToken} from "../controler/auth.js";
import {verifyLogin} from "../middleware/verify.js"
const router=express.Router()

router.post("/login",login)
router.delete("/logout",logout)
router.get("/me",verifyLogin,Me)
router.get("/token",refreshToken)

export default router