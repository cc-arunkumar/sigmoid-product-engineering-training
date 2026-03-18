const express = require("express");

const router= express.Router();

const productController=require("../Controllers/productController")
const validateProduct = require("../Middleware/validateProduct");
const validatePartialProduct = require("../Middleware/validatePartialProduct");
const protect = require("../Middleware/authMiddleware");

router.get("/products",productController.getAllProducts);
router.get("/products/:id",productController.getProductById);

router.post("/products",protect, validateProduct,productController.createProduct);

router.put("/products/:id",protect,validateProduct,productController.updateProduct);

router.delete("/products/:id", protect, productController.deleteProduct);

router.patch("/products/:id",protect,validatePartialProduct, productController.updatePartialProduct);

module.exports=router;