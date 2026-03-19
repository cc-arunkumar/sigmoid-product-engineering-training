const express = require("express")
const router = express.Router();

const { login, googleCallback } = require("../controllers/authControllers");
const { authLimiter } = require("../middleware/rateLimiter");
const passport = require("../config/passport");

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