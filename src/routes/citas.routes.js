import { Router } from "express";
import { getCitas,createCita,getCitaPaciente,getCitasPsicologo,deleteCita,updateCitaStatus } from "../controllers/cita.controller";
import { authRequired } from "../middlewares/ValidateToken";

const router = Router();

router.get("/citas", getCitas);
router.post("/citas", authRequired,createCita);
router.get("/citas/paciente/:id",getCitaPaciente);
router.get("/citas/psicologo/:id",getCitasPsicologo);
router.delete("/citas/:id", authRequired,deleteCita);
router.put("/citas/:id", authRequired,updateCitaStatus);

