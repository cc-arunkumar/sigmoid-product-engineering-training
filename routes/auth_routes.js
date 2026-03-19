import { login,googleCallback } from "../controllers/authController.js";
import { authLimiter } from "../middlewares/rateLimiter.js";
import passport from "../config/passport.js"
import express from "express"
const router=express.Router();
router.post("/api/auth/login",authLimiter,login)
router.get(
 "/api/auth/google",
 passport.authenticate("google", {
 scope: ["profile", "email"]
 })
);
router.get(
 "/api/auth/google/callback",
 passport.authenticate("google", { session: false,}),
 googleCallback
)
export default router;