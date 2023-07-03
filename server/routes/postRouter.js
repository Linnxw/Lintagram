import express from "express";
import {getAllPost,getPostById,createPost,updatePost,deletePost,myPost,getSearchPost} from "../controler/postControler.js";
import {verifyLogin} from "../middleware/verify.js"
const router=express.Router()

router.get("/post",getAllPost)
router.get("/post/me",verifyLogin,myPost)
router.get("/post/search/:title",getSearchPost)
router.get("/post/:id",getPostById)
router.post("/post",verifyLogin,createPost)
router.patch("/post/:id",verifyLogin,updatePost)
router.delete("/post/:id",verifyLogin,deletePost)
export default router