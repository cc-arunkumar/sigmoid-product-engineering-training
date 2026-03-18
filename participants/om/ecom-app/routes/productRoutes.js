const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');
const validateProduct = require('../middleware/validateProduct');
const validateProductPartial = require('../middleware/validateProductPartial');
const protect = require('../middleware/authMiddleware');

router.get('/api/products', productController.getAllProducts);

router.get('/api/product/:id', productController.getProductById);

router.post('/api/product', protect, validateProduct, productController.createProduct);

router.put('/api/product/:id', protect, validateProduct, productController.updateProduct);

router.patch('/api/product/:id', protect, validateProductPartial, productController.patchProduct);

router.delete('/api/product/:id', protect, productController.deleteProduct);

module.exports = router;