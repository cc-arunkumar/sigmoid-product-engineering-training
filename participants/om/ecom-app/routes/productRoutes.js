const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');

router.get('/api/products', productController.getAllProducts);

router.get('/api/product/:id', productController.getProductById);

router.post('/api/product', productController.createProduct);

router.put('/api/product/:id', productController.updateProduct);

router.patch('/api/product/:id', productController.updatePartialProduct);

router.delete('/api/product/:id', productController.deleteProduct);

module.exports = router;