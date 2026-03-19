// const express = require("express");
// const router = express.Router();

// const { login } = require("../controllers/authController");
// const { authLimiter } = require("../middleware/Ratelimiter");

// // Base: /api/auth

// router.post("/login",authLimiter, login);

// module.exports = router;
const express = require("express");
const router = express.Router();

const passport = require("../config/passport");
const { login, googleCallback } = require("../controllers/authController");
const { authLimiter } = require("../middleware/rateLimiter");

// Normal login
router.post("/login", authLimiter, login);

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

module.exports = router;