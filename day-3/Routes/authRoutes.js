const express = require("express");

const router = express.Router();

const {login} = require("../Controller/authController")

const {authLimiter} = require("../middlewere/rateLimiter")


router.post("/login"  ,  authLimiter , login) ; 

module.exports = router ; 
