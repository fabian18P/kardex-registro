import { Router } from "express";
import { getHens, getHen, createHen, deleteHen, updateHen } from '../controllers/hens.controller.js'

const router = Router();

// LLAMAR REGISTROS DE GALLINAS
router.get("/gallina", getHens);

// LLAMAR REGISTRO DE LOTE DE GALLINA
router.get("/gallina/:gallina_id", getHen);

// INSERTAR LOTE DE GALLINAS
router.post("/gallina", createHen);

// ELIMINAR LOTE DE GALLINAS
router.delete("/gallina/:gallina_id", deleteHen);

// ACTUALIZAR LOTE DE GALLINAS
router.put("/gallina/:gallina_id", updateHen);

export default router;