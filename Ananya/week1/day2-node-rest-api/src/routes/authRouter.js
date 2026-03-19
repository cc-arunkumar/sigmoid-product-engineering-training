const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const { login, googleCallback, testSuccess } = require("../controllers/authController");
const { authLimiter } = require("../middleware/rateLimiter");

// Standard login
router.post("/login", authLimiter, login);

// Google OAuth routes
// Initiates Google OAuth flow
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/auth/failure" }),
  googleCallback
);

// OAuth failure (useful for testing)
router.get("/failure", (req, res) => {
  return res.status(401).json({
    success: false,
    message: "Authentication failed",
    details: req.query || null
  });
});

// OAuth success (shows query params/token in the URL for quick testing)
router.get("/success", (req, res) => {
  return res.status(200).send(`Authentication successful. Query: ${JSON.stringify(req.query)}`);
});

// Local test: simulate OAuth success (creates token and redirects to success URL)
router.get("/test/success", testSuccess);

module.exports = router;