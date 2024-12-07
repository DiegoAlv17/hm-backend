import { Router } from "express";
import { createPost,getPosts, deletePost, getPostById, updatePost, updatePostPartial } from "../controllers/post.controller.js";
import { authRequired } from "../middlewares/ValidateToken.js";

const router = Router();

router.post("/posts", authRequired,createPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", authRequired,updatePost);
router.delete("/posts/:id", authRequired,deletePost);
router.patch("/posts/:id", authRequired,updatePostPartial);

export default router;
