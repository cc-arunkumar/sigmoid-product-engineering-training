const express=require("express");

const router=express.Router();

const {login}=require("../controllers/authControllers");

router.post("/api/login/", login);

module.exports=router;