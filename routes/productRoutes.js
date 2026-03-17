const express=require("express")

const router=express.Router();

const productController=require("../controllers/productController.js")

router.get("/api/products",productController.getAllProducts);
router.get("/api/products/:id",productController.getProductById);

module.exports=router;