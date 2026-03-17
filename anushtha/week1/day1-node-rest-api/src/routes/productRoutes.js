const express = require("express")
const router=express.Router();//have multiple paths from here
const productController=require("../controllers/productController.js");
router.get("/products",productController.getAllProducts);
module.exports=router;