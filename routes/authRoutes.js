const express = require("express");
const router = express.Router();

const passport = require("../config/passport");
const { login, googleCallback } = require("../controllers/authController");
const { authLimiter } = require("../middleware/rateLimiter");

// ================= NORMAL LOGIN =================
router.post("/login", authLimiter, login);

// ================= GOOGLE OAUTH =================

// Step 1: Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Step 2: Callback from Google
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

module.exports = router;