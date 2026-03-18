const express = require("express");
const router = express.Router();

const{login}=require("../controllers/authController");
router.post("/login",login);


const{authLimiter} = require("../middleware/rateLimiter");

//Apply strict limiter only to login
router.post("/login",authLimiter,login);


module.exports = router;