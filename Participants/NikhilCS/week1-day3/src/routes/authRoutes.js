const express = require("express");
const router = express.Router();
const passport=require("../config/passport")
const {googleCallback}=require("../controllers/authController")
const { login } = require("../controllers/authController");
const { authLimiter } = require("../middleware/rateLimiter");
//router.post("/login", login);
//added now 
router.post("/login",authLimiter,login);
module.exports = router;
router.get(
 "/google",
 passport.authenticate("google", {
 scope: ["profile", "email"]
 })
);
router.get(
 "/google/callback",
 passport.authenticate("google", { session: false }),
 googleCallback
);
