const express = require("express");
const router = express.Router();
//const passport = require("../config/passport");
const { login } = require("../controllers/authController");
//const { authLimiter } = require("../middleware/rateLimiter");
// Normal login
router.post("/login", login);
// Step 1: Redirect to Google
// router.get(
//     "/google",
//     passport.authenticate("google", {
//         scope: ["profile", "email"]
//     })
// );


// router.get(
//  "/google/callback",
//  passport.authenticate("google", { session: false }),googleCallback
// );
module.exports = router;


