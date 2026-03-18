const express = require("express");

const router = express.Router();

const {login} = require("../Controller/authController")

const {authlimter} = require("../middlewere/rateLimiter")


router.post("/login"  ,  authlimter , login) ; 

module.exports = router ; 
