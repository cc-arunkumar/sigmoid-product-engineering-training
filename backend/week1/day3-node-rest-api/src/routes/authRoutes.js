const express = require("express");
const router = express.Router();

const { login } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const { authLimiter } = require("../middleware/rateLimiter");

router.post("/login", authLimiter, login);

module.exports = router;
