import express from "express";
const router = express.Router();
import { login, googleCallback } from "../controllers/authControllers.js";
import { authLimiter } from "../middleware/rateLimiter.js";
router.post("/api/auth/login", authLimiter, login);
import passport from "../config/passport.js";

// Step 1: Redirect to Google
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);
// Step 2: Callback from Google
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    googleCallback
);


export default router;