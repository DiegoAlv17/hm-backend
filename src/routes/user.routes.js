import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getPsicologos,
  getPsicologoById,
  createPaciente,
  createPsicologo,
  getPacienteById,
  getPacientes,
  updatePaciente,
  updatePsicologo,
} from "../controllers/user.controller.js";
// import { authRequired } from "../middlewares/ValidateToken.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/pacientes", getPacientes);
router.get("/pacientes/:id", getPacienteById);
router.post("/pacientes", createPaciente);
router.put("/pacientes/:id", updatePaciente);


router.get("/psicologos", getPsicologos);
router.get("/psicologos/:id", getPsicologoById);
router.post("/psicologos", createPsicologo);
router.put("/psicologos/:id", updatePsicologo);


export default router;
