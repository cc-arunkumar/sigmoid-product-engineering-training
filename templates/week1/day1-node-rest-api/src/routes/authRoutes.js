const express = require("express");
const router = express.Router();

const { login } = require("../controllers/authController");
const {authLimiter}=require("../middleware/rateLimiter")


// Base: /api/auth
router.post("/login",authLimiter, login);


module.exports = router;