import { Router } from "express";
import { authRequired } from "../middlewares/ValidateToken.js";
import { crearPsicologo,actualizarPsicologo,eliminarPsicologo,obtenerPsicologoPorId,obtenerPsicologos } from "../controllers/psicologo.controller.js";

const router = Router();  

router.get("/psicologos", obtenerPsicologos);
router.get("/psicologos/:id", obtenerPsicologoPorId);
router.post("/psicologos", crearPsicologo);
router.put("/psicologos/:id",actualizarPsicologo);
router.delete("/psicologos/:id",eliminarPsicologo);

export default router;
