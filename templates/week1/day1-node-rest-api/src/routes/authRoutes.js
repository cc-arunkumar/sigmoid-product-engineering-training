const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const { login , googleCallback} = require("../controllers/authController");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
); //redirect to google 

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

const { authLimiter } = require("../middleware/rateLimiter");

router.post("/login", authLimiter, login);

module.exports = router;