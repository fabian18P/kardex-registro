import { Router } from "express";
import { getSheds, getShed, createShed, deleteShed, updateShed } from '../controllers/sheds.controller.js'

const router = Router();

// LLAMAR A TODOS LOS GALPONE
router.get("/galpon", getSheds);

// LLAMAR UN GALPON
router.get("/galpon/:etiqueta_galpon", getShed);

// INSERTAR GALPON
router.post("/galpon", createShed);

// ELIMINAR GALPON
router.delete("/galpon/:lote_galpon", deleteShed);

// ACTUALIZAR GALPON
router.put("/galpon/:lote_galpon", updateShed);

export default router;