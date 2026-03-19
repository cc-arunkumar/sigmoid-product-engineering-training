// const express = require("express");
// const router = express.Router();
// const passport = require("../config/passport");
// const { login, googleCallback, oauthSuccess, oauthError } = require("../controllers/authControllers");
// const { authLimiter } = require("../middleware/rateLimiter");

// // Normal login
// router.post("/login", authLimiter, login);

// // OAuth Debug/Info endpoint
// router.get("/oauth-info", (req, res) => {
//   res.json({
//     message: "Google OAuth2 Login Flow",
//     steps: [
//       "1. Click the link below to start Google OAuth",
//       "2. Sign in with your Google account",
//       "3. Grant permissions",
//       "4. You will be redirected and receive a JWT token"
//     ],
//     loginUrl: "http://localhost:3000/api/auth/google",
//     note: "Make sure you have Google OAuth credentials configured in .env"
//   });
// });

// // Step 1: Redirect to Google for consent
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"]
//   })
// );

// // Step 2: Google callback
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false, failureRedirect: "/api/auth/oauth-error" }),
//   googleCallback
// );

// // OAuth Success Page
// router.get("/oauth-success", oauthSuccess);

// // OAuth Error Page
// router.get("/oauth-error", oauthError);

// module.exports = router;


const express = require("express");
const router = express.Router();

const passport = require("../config/passport");
const { login, googleCallback, oauthSuccess, oauthError } = require("../controllers/authControllers");
const { authLimiter } = require("../middleware/rateLimiter");

// ================= NORMAL LOGIN =================
router.post("/login", authLimiter, login);

// ================= GOOGLE OAUTH =================

// Step 1: Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Step 2: Callback from Google
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/api/auth/oauth-error" }),
  googleCallback
);

// OAuth Success Page
router.get("/oauth-success", oauthSuccess);

// OAuth Error Page
router.get("/oauth-error", oauthError);

// OAuth Info endpoint
router.get("/oauth-info", (req, res) => {
  res.json({
    message: "Google OAuth2 Login Flow",
    steps: [
      "1. Click the link below to start Google OAuth",
      "2. Sign in with your Google account",
      "3. Grant permissions",
      "4. You will be redirected and receive a JWT token"
    ],
    loginUrl: "http://localhost:3000/api/auth/google",
    note: "Make sure you have Google OAuth credentials configured in .env"
  });
});

module.exports = router;