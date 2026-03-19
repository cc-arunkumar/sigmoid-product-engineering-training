const express=require("express");

const passport = require("../config/passport");

const router=express.Router();
const {login , googleCallback }=require("../controllers/authControllers");
const {authLimiter}=require("../middleware/rateLimiter");


router.post("/login",authLimiter, login);

router.get("/google", passport.authenticate("google", {
 scope: ["profile", "email"]
 })
)

router.get(
 "/google/callback",
 passport.authenticate("google", { session: false }),
 googleCallback
);

module.exports=router; 