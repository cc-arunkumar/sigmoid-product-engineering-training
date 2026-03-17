const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

router.get('api/products', productController.getAllProducts);

router.get("api/product/:id", productController.getProductById);

router.post("/products", productController.createProduct);

router.put("/product/:id", productController.updateProduct);

router.delete("/product/:id", productController.deleteProductById);

router.patch("/product/:id", productController.updatePartialProduct);




module.exports = router;