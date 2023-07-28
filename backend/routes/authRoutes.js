import express from "express"
import { user_register,user_login } from "../controllers/authController.js"

const router = express.Router()

router.post('/auth/register', user_register)
router.post('/auth/login', user_login)

export default router;