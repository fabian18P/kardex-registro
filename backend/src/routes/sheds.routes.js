import { Router } from "express";
import { getSheds, getShed, createShed, deleteShed, updateShed } from '../controllers/sheds.controller.js'
import { authJwt } from '../middlewares/index.js'

const router = Router();

// LLAMAR A TODOS LOS GALPONE
router.get("/galpon", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isOperario, authJwt.isVisitante], getSheds);

// LLAMAR UN GALPON
router.get("/galpon/:etiqueta_galpon", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isOperario, authJwt.isVisitante], getShed);

// INSERTAR GALPON
router.post("/galpon", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isOperario], createShed);

// ELIMINAR GALPON
router.delete("/galpon/:lote_galpon", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isOperario], deleteShed);

// ACTUALIZAR GALPON
router.put("/galpon/:lote_galpon", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isOperario], updateShed);

export default router;