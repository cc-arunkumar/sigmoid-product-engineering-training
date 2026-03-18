const express=require("express");

const router=express.Router();
const {login}=require("../controllers/authControllers");
const {authLimiter}=require("../middleware/rateLimiter");



router.post("/api/login/",authLimiter, login);

module.exports=router; 