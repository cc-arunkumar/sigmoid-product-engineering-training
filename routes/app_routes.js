import { login } from "../controllers/authController.js";
import express from "express"
const router=express.Router();
router.post("/api/auth/login",login)
export default router;