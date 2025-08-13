import { Router } from "express";
import { getIntakes, getIntake, createIntake, deleteIntake, updateIntake } from '../controllers/intakes.controller.js'
import { authJwt } from '../middlewares/index.js'

const router = Router();

// LLAMAR REGISTROS DE CONSUMOS
router.get("/consumo", [authJwt.verifyToken, authJwt.hasRole(['admin', 'operario', 'visitante'])], getIntakes);

// LLAMAR REGISTRO DE CONSUMO
router.get("/consumo/:consumo_id", [authJwt.verifyToken, authJwt.hasRole(['admin', 'operario', 'visitante'])], getIntake);

// INSERTAR REGISTRO DE CONSUMO
router.post("/consumo", [authJwt.verifyToken, authJwt.hasRole(['admin', 'operario'])], createIntake);

// ELIMINAR REGISTRO DE CONSUMO
router.delete("/consumo/:consumo_id", [authJwt.verifyToken, authJwt.hasRole(['admin', 'operario'])], deleteIntake);

// ACTUALIZAR REGISTRO DE CONSUMO
router.put("/consumo/:consumo_id", [authJwt.verifyToken, authJwt.hasRole(['admin', 'operario'])], updateIntake);

export default router;