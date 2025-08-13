import { Router } from "express";
import { getUsers, getUser, deleteUser, updateUser } from "../controllers/users.controller.js"
import { authJwt } from '../middlewares/index.js'

const router = Router();

// LLAMAR A TODOS LOS USUARIO
router.get("/usuario", [authJwt.verifyToken, authJwt.hasRole(['admin'])], getUsers);

// LLAMAR UN USUARIO EN ESPECIFICO
router.get("/usuario/:dni", [authJwt.verifyToken, authJwt.hasRole(['admin'])], getUser);

// ELIMINAR USUARIO
router.delete("/usuario/:dni", [authJwt.verifyToken, authJwt.hasRole(['admin'])], deleteUser);

// ACTUALIZAR USUARIO
router.put("/usuario/:dni", [authJwt.verifyToken, authJwt.hasRole(['admin'])], updateUser);

export default router;
