const express = require("express");
const router = express.Router();

const { login } = require("../controllers/authController");
const { authLimiter } = require("../middleware/rateLimiter");
//router.post("/login", login);
//added now 
router.post("/login",authLimiter,login);
module.exports = router;
