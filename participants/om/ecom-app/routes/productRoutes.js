const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');
const validateProduct = require('../middleware/validateProduct');
const validateProductPartial = require('../middleware/validateProductPartial');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

router.get('/api/products', productController.getAllProducts);

router.get('/api/product/:id', productController.getProductById);

router.post('/api/product', protect, authorize("user"),validateProduct, productController.createProduct);

router.put('/api/product/:id', protect, authorize("user"), validateProduct, productController.updateProduct);

router.patch('/api/product/:id', protect, authorize("admin"), validateProductPartial, productController.patchProduct);

router.delete('/api/product/:id', protect, authorize("admin"), productController.deleteProduct);

module.exports = router;