const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

router.get('api/products', productController.getAllProducts);

router.get("api/product/:id", productController.getProductById);

router.post("api/products", productController.createProduct);

router.put("api/product/:id", productController.updateProduct);

router.delete("api/product/:id", productController.deleteProductById);

router.patch("api/product/:id", productController.updatePartialProduct);

module.exports = router;