import { login } from "../controllers/authController.js";
import { authLimiter } from "../middlewares/rateLimiter.js";
import express from "express"
const router=express.Router();
router.post("/api/auth/login",authLimiter,login)
export default router;