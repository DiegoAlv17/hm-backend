import { Router } from "express";
import { createCentroDeSalud,deleteCentroDeSalud,getCentroDeSaludById,getCentrosDeSalud,updateCentroDeSalud } from "../controllers/centro.controller.js";

const router = Router();

router.post("/centros", createCentroDeSalud);
router.get("/centros", getCentrosDeSalud);
router.get("/centros/:id", getCentroDeSaludById);
router.put("/centros/:id", updateCentroDeSalud);
router.delete("/centros/:id", deleteCentroDeSalud);

export default router;
