const express = require("express");
const router = express.Router();

const passport = require("../config/passport");

const { login , googleCallback } = require("../Controllers/authController");
const { authLimiter } = require("../Middleware/rateLimiter");

router.post("/login",authLimiter,login);

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile","email"]
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google",{session:false}),
    googleCallback
);

module.exports = router;