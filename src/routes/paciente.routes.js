import { Router } from "express";
import { authRequired } from "../middlewares/ValidateToken.js";

import {
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
  obtenerPacientePorId,
  obtenerPacientes,
} from "../controllers/paciente.controller.js";

const router = Router();

router.get("/pacientes", obtenerPacientes);
router.get("/pacientes/:id", obtenerPacientePorId);
router.post("/pacientes", crearPaciente);
router.put("/pacientes/:id",  actualizarPaciente);
router.delete("/pacientes/:id", eliminarPaciente);

export default router;
