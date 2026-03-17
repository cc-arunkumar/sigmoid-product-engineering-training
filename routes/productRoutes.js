const express = require('express');
const router = express.Router();

let productController = require('../controllers/productController');
const validateProduct = require('../middleware/validateProduct');

router.get('/api/products', productController.getAllProducts);
router.get('/api/products/:id', productController.getProductById);

router.post("/api/products", validateProduct, productController.createProduct);
router.put("/api/products/:id", validateProduct, productController.updateProduct);
router.patch("/api/products/:id", validateProduct, productController.partialUpdateProduct);

module.exports = router;
