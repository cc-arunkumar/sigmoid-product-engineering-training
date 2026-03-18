const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');

router.get('/api/products', productController.getAllProducts);

router.get('/api/product/:id', productController.getProductById);

router.post('/api/product', productController.createProduct);

router.put('/api/product/:id', productController.updateProduct);

module.exports = router;