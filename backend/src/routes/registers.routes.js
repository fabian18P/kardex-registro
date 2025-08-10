import { Router } from "express";
import { getRegisters, getRegister, createRegister, deleteRegister, updateRegister } from '../controllers/registers.controller.js'
import { authJwt } from '../middlewares/index.js'

const router = Router();

// LLAMAR REGISTROS KARDEX
router.get("/registro", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isOperario, authJwt.isVisitante], getRegisters);

// LLAMAR REGISTRO KARDEX
router.get("/registro/:registro_id", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isOperario, authJwt.isVisitante], getRegister);

// INSERTAR REGISTRO KARDEX
router.post("/registro", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isOperario], createRegister);

// ELIMINAR REGISTRO KARDEX
router.delete("/registro/:registro_id", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isOperario], deleteRegister);

// ACTUALIZAR REGISTRO KARDEX
router.put("/registro/:registro_id", [authJwt.verifyToken, authJwt.isAdmin, authJwt.isOperario], updateRegister);

export default router;