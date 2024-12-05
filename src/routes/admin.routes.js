import { Router } from "express";
import { readAdmins,createAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.get("/admins", readAdmins);
router.post("/admins", createAdmin);

export default router;