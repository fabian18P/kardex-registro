import { Router } from "express";
import { getUsers, getUser, createUser, deleteUser, updateUser } from "../controllers/users.controller.js"

const router = Router();

// LLAMAR A TODOS LOS USUARIO
router.get("/usuario", getUsers);

// LLAMAR UN USUARIO EN ESPECIFICO
router.get("/usuario/:dni", getUser);

// INSERTAR USUARIO
router.post("/usuario", createUser);

// ELIMINAR USUARIO
router.delete("/usuario/:dni", deleteUser);

// ACTUALIZAR USUARIO
router.put("/usuario/:dni", updateUser);

export default router;
