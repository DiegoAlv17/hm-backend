import { Router } from "express"; 
import { authRequired } from "../middlewares/ValidateToken.js";
import { register, login, logout, profile } from "../controllers/auth.controller.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile',authRequired,profile)

export default router;