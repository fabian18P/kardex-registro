import { Router } from "express"
import { signUp, signIn } from '../controllers/auth.controller.js'
import { authJwt, verifySignup } from "../middlewares/index.js"

const router = Router()

router.post("/signup", [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkDuplicateDniOrEmail, verifySignup.checkRolesExisted], signUp)
router.post("/signin", signIn)

export default router;