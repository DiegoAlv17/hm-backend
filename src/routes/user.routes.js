import { Router } from "express";
import { getUsers,getUserById,updateUser,deleteUser,getPsicologos,getPsicologoById } from "../controllers/user.controller.js";
// import { authRequired } from "../middlewares/ValidateToken.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/psicologos", getPsicologos);
router.get("/psicologos/:id", getPsicologoById);


export default router;