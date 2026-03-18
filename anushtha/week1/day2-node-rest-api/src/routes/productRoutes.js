const express = require("express")
const router=express.Router();//have multiple paths from here
const productController=require("../controllers/productController");
const validateProduct=require("../middleware/validateProduct");
const validatePartialProduct=require("../middleware/validatePartialProduct");
const protect=require("../middleware/authMiddleware");
router.get("/products",productController.getAllProducts);
router.get("/products/:id",productController.getProductById);
router.post("/products",protect,validateProduct,productController.createProduct);
router.put("/products/:id",protect,validateProduct,productController.updateProduct);
router.delete("/products/:id",protect,productController.deleteProduct);
router.patch("/products/:id",protect,validatePartialProduct,productController.updatePartialProduct);
module.exports=router;