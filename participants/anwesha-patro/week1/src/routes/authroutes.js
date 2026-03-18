const express = require("express");

const router = express.Router();

const { login } = require("../controllers/authcontroller");

const { authLimiter } = require("../middleware/rateLimiter")

router.post("/login", authLimiter, login);

module.exports = router;