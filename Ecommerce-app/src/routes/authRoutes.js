const express = require("express");
const router = express.Router();

const passport = require("../config/passport");
const { login, googleCallback } = require("../controllers/authControllers");
const { authLimiter } = require("../middleware/rateLimiter");

// Normal login
router.post("/login", authLimiter, login);

// Step 1: Redirect to Google consent screen
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

// Step 2: Google redirects back here with auth code
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    googleCallback
);

module.exports = router;
