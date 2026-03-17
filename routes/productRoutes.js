const express=require("express");
const router=express.Router();
const productController=require("../controllers/productController")

router.get("/products",productController.getProducts)
router.get("/product/:id",productController.getProductById)
router.post("/product",productController.createProduct)

module.exports=router;