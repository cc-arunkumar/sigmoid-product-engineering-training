import express from "express";
const router = express.Router();
import {login} from "../controllers/authControllers.js";
import { authLimiter } from "../middleware/rateLimiter.js";
router.post("/api/auth/login",authLimiter,login);

export default router;