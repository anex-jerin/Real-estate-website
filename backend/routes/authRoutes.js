import express from "express"
import { user_register } from "../controllers/authController.js"

const router = express.Router()

router.post('/auth/register', user_register)

export default router;