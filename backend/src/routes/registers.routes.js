import { Router } from "express";
import { getRegisters, getRegister, createRegister, deleteRegister, updateRegister } from '../controllers/registers.controller.js'
import { authJwt } from '../middlewares/index.js'

const router = Router();

// LLAMAR REGISTROS KARDEX
router.get("/registro", [authJwt.verifyToken, authJwt.hasRole(['admin', 'operario', 'visitante'])], getRegisters);

// LLAMAR REGISTRO KARDEX
router.get("/registro/:registro_id", [authJwt.verifyToken, authJwt.hasRole(['admin', 'operario', 'visitante'])], getRegister);

// INSERTAR REGISTRO KARDEX
router.post("/registro", [authJwt.verifyToken, authJwt.hasRole(['admin', 'operario'])], createRegister);

// ELIMINAR REGISTRO KARDEX
router.delete("/registro/:registro_id", [authJwt.verifyToken, authJwt.hasRole(['admin', 'operario'])], deleteRegister);

// ACTUALIZAR REGISTRO KARDEX
router.put("/registro/:registro_id", [authJwt.verifyToken, authJwt.hasRole(['admin', 'operario'])], updateRegister);

export default router;