const express = require("express");
const router = express.Router();

const {login} =require("../controllers/authController");
const { authLimiter } = require("../middlewares/rateLimiter.js")

router.post("/login" , authLimiter, login);

//base : /api/auth


module.exports = router;