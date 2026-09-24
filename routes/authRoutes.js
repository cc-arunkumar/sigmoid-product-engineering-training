const express = require("express");
const router = express.Router();

const passport = require("../config/passport");
const { login, googleCallback } = require("../controllers/authController");

const { authLimiter } = require("../middleware/rateLimiter");

//Apply strict limiter only to login
// router.post("/login", authLimiter, login);

// router.get(
//     "/google",
//     passport.authenticate("google", {
//         scope: ["profile", "email"]
//     })
// );

// router.get(
//     "/google/callback",
//     passport.authenticate("google", { session: false }),
//     googleCallback
// );

// const { login } = require("../controllers/authController");


router.post("/login", login);
module.exports = router;