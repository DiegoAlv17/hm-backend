import { Router } from "express";
import { createPost,getPosts, deletePost, getPostById, updatePost, updatePostPartial } from "../controllers/post.controller.js";
import { authRequired } from "../middlewares/ValidateToken.js";

const router = Router();

router.post("/posts",createPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/:id",updatePost);
router.delete("/posts/:id", deletePost);
router.patch("/posts/:id",updatePostPartial);

export default router;
