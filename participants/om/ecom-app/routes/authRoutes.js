const express = require("express");
const router = express.Router();

// Controllers
const { login, googleCallback } = require("../controllers/authController");

// Passport config (Google OAuth)
const passport = require("../config/passport");

// Rate limiter (for login protection)
const { authLimiter } = require("../middleware/rateLimiter");

router.post("/login", authLimiter, login);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

module.exports = router;