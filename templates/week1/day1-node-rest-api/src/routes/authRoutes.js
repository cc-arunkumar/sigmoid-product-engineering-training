const express = require("express");
const router = express.Router();

// Existing Controllers
const { login, googleCallback } = require("../controllers/authControllers");
// Import your new SQL User Controllers
const { createSqlUser, getSqlUsers } = require("../controllers/sqlController");

const { authLimiter } = require("../middleware/rateLimiter");
const passport = require("../config/passport");

// Create a new SQL User (Register)
router.post("/register", authLimiter, createSqlUser);

// Get all SQL Users
router.get("/users", getSqlUsers);

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