import { Router } from "express";
import { getUsers, getUser, deleteUser, updateUser } from "../controllers/users.controller.js"
import { authJwt } from '../middlewares/index.js'

const router = Router();

// LLAMAR A TODOS LOS USUARIO
router.get("/usuario", [authJwt.verifyToken, authJwt.isAdmin], getUsers);

// LLAMAR UN USUARIO EN ESPECIFICO
router.get("/usuario/:dni", [authJwt.verifyToken, authJwt.isAdmin], getUser);

// ELIMINAR USUARIO
router.delete("/usuario/:dni", [authJwt.verifyToken, authJwt.isAdmin], deleteUser);

// ACTUALIZAR USUARIO
router.put("/usuario/:dni", [authJwt.verifyToken, authJwt.isAdmin], updateUser);

export default router;
