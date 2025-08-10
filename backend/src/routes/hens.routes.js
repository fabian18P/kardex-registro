import { Router } from "express";
import { getHens, getHen, createHen, deleteHen, updateHen } from '../controllers/hens.controller.js'
import { authJwt } from '../middlewares/index.js'

const router = Router();

// LLAMAR REGISTROS DE GALLINAS
router.get("/gallina", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isOperario, authJwt.isVisitante], getHens);

// LLAMAR REGISTRO DE LOTE DE GALLINA
router.get("/gallina/:gallina_id", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isOperario, authJwt.isVisitante], getHen);

// INSERTAR LOTE DE GALLINAS
router.post("/gallina", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isOperario], createHen);

// ELIMINAR LOTE DE GALLINAS
router.delete("/gallina/:gallina_id", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isOperario], deleteHen);

// ACTUALIZAR LOTE DE GALLINAS
router.put("/gallina/:gallina_id", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isOperario], updateHen);

export default router;