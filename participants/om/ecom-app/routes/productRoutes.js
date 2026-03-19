const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');
const validateProduct = require('../middleware/validateProduct');
const validateProductPartial = require('../middleware/validateProductPartial');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const cache = require('../middleware/cache');

router.get('/api/products', cache(60000), productController.getAllProducts);

router.get('/api/product/:id', cache(60000), productController.getProductById);

router.post('/api/product', protect, authorize("user"), validateProduct, productController.createProduct);

router.put('/api/product/:id', protect, authorize("user"), validateProduct, productController.updateProduct);

router.patch('/api/product/:id', protect, authorize("user"), validateProductPartial, productController.partialUpdateProduct);

router.delete('/api/product/:id', protect, authorize("user"), productController.deleteProduct);

module.exports = router;