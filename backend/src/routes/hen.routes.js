import { Router } from "express";
import { getSheds, getShed, createShed, deleteShed, updateShed } from '../controllers/sheds.controller.js'

const router = Router();

// LLAMAR REGISTROS DE GALLINAS
router.get("/gallina", getSheds);

// LLAMAR REGISTRO DE LOTE DE GALLINA
router.get("/gallina/:gallina_id", getShed);

// INSERTAR LOTE DE GALLINAS
router.post("/gallina", createShed);

// ELIMINAR LOTE DE GALLINAS
router.delete("/gallina/:gallina_id", deleteShed);

// ACTUALIZAR LOTE DE GALLINAS
router.put("/gallina/:gallina_id", updateShed);

export default router;