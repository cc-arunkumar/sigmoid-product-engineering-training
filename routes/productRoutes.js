const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');
const validateProduct= require("../middlewares/validateProduct");
const validatepatchProduct = require('../middlewares/validatepatchProduct');
const protect = require('../middlewares/authMiddleware');

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.post('/', protect, validateProduct, productController.createProduct);

router.put('/:id',validateProduct, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

router.patch('/:id',validatepatchProduct, productController.patchProduct);

module.exports = router