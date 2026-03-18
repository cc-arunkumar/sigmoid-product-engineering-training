const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');
const validateProduct= require("../middlewares/validateProduct");
const validatepatchProduct = require('../middlewares/validatepatchProduct');
const protect = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');
const cache = require('../middlewares/cache');

router.get('/',cache(60000),productController.getAllProducts);

router.get('/:id',cache(60000), productController.getProductById);

router.post('/', protect,authorize('user'), validateProduct, productController.createProduct);

router.put('/:id',protect,authorize('user'),validateProduct, productController.updateProduct);

router.delete('/:id', protect,authorize('admin'), productController.deleteProduct);
router.patch('/:id',protect,authorize('admin'),validatepatchProduct, productController.patchProduct);

module.exports = router