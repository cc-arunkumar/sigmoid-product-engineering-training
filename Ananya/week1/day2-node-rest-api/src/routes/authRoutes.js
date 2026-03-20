const express = require("express");
const router = express.Router();
const passport = require("passport");
const { login, googleCallback } = require("../controllers/authController");
const { authLimiter } = require("../middleware/rateLimiter");

// Standard login
router.post("/login", authLimiter, login);

// Google OAuth routes
// Initiates Google OAuth flow
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleCallback
);

module.exports = router;