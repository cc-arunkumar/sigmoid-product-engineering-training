const express=require("express");
const router= express.Router();
const { login, googleCallback } = require("../controllers/authController");
const { authLimiter } =require("../middleware/rateLimiter");
const passport = require("../config/passport");
// Apply strict limiter only to login
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
module.exports=router;