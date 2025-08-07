import { Router } from "express";
import { getRegisters, getRegister, createRegister, deleteRegister, updateRegister } from '../controllers/intakes.controller.js'

const router = Router();

// LLAMAR REGISTROS KARDEX
router.get("/registro", getRegisters);

// LLAMAR REGISTRO KARDEX
router.get("/registro/:registro_id", getRegister);

// INSERTAR REGISTRO KARDEX
router.post("/registro", createRegister);

// ELIMINAR REGISTRO KARDEX
router.delete("/registro/:registro_id", deleteRegister);

// ACTUALIZAR REGISTRO KARDEX
router.put("/registro/:registro_id", updateRegister);

export default router;