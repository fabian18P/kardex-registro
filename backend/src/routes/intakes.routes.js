import { Router } from "express";
import { getIntakes, getIntake, createIntake, deleteIntake, updateIntake } from '../controllers/intakes.controller.js'

const router = Router();

// LLAMAR REGISTROS DE CONSUMOS
router.get("/consumo", getIntakes);

// LLAMAR REGISTRO DE CONSUMO
router.get("/consumo/:consumo_id", getIntake);

// INSERTAR REGISTRO DE CONSUMO
router.post("/consumo", createIntake);

// ELIMINAR REGISTRO DE CONSUMO
router.delete("/consumo/:consumo_id", deleteIntake);

// ACTUALIZAR REGISTRO DE CONSUMO
router.put("/consumo/:consumo_id", updateIntake);

export default router;