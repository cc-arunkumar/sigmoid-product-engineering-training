const express = require("express");

const router = express();

const {login} = require("../Controller/authController")

router.post("/login" , login) ; 

module.exports = router ; 
