const express = require("express");

const router= express.Router();

const productController=require("../Controllers/productController")
const validateProduct = require("../Middleware/validateProduct");
const validatePartialProduct = require("../Middleware/validatePartialProduct");

router.get("/products",productController.getAllProducts);

router.get("/products/:id",productController.getProductById);

router.post("/products",validateProduct,productController.createProduct);

router.put("/products/:id",validateProduct,productController.updateProduct);

router.delete("/products/:id",productController.deleteProduct);

router.patch("/products/:id",validatePartialProduct, productController.updatePartialProduct);

module.exports=router;