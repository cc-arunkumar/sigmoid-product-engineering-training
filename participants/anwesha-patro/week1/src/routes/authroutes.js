const express = require("express");

const router = express.Router();

const { login, googleCallback } = require("../controllers/authcontroller");

const passport = require("../config/passport")

const { authLimiter } = require("../middleware/rateLimiter")

router.post("/login", authLimiter, login);

// router.get(
//     "/google",
//     passport.authenticate("google", {
//         scope: ["profile", "email"]
//     })
// );
// // Step 2: Callback from Google
// router.get(
//     "/google/callback",
//     passport.authenticate("google", { session: false }),
//     googleCallback
// );


module.exports = router;