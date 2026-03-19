const express=require("express");
const router= express.Router();
const { login, googleCallback } = require("../controllers/authController");
const { authLimiter } =require("../middleware/rateLimiter");
const passport = require("passport");
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
  passport.authenticate("google", { session: true, failureRedirect: "/api/auth/failure" }),
  googleCallback
);

router.get("/failure", (req, res) => {
  res.status(401).json({ message: "Authentication failed" });
});

router.get("/success", (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  res.json({ message: "Authentication successful", user: req.user });
});
module.exports=router;