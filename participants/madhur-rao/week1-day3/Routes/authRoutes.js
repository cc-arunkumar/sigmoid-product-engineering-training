const express = require("express");
const router = express.Router();

const { login } = require("../Controllers/authController");
const { authLimiter } = require("../Middleware/rateLimiter");

router.post("/login",authLimiter,login);
module.exports = router;