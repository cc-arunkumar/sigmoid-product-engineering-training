const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');
const validateProduct= require("../middlewares/validateProduct")

router.get('/api/products', productController.getAllProducts);

router.get('/api/products/:id', productController.getProductById);

router.post('/api/products', validateProduct,productController.createProduct);

router.put('/api/products/:id',validateProduct, productController.updateProduct);

router.delete('/api/products/:id',validateProduct, productController.deleteProduct);

router.patch('/api/products/:id', productController.patchProduct);

module.exports = router