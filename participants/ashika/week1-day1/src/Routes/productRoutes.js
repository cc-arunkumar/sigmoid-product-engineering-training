const express=require("express");

const router=express.Router();

const productController=require("../controllers/productController");

router.get("/api/products", productController.getallproducts);
router.get("/api/product/:id", productController.getproductbyId);

module.exports=router;