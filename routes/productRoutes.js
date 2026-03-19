const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');
const mongoController = require('../controllers/mongoController');
const validateProduct= require("../middlewares/validateProduct");
const validatepatchProduct = require('../middlewares/validatepatchProduct');
const protect = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorize');
const cache = require('../middlewares/cache');

router.get('/',cache(60000), mongoController.getAllProducts);

router.get('/:id',cache(60000), mongoController.getProductById);

router.post('/', protect, authorize('user'), validateProduct, mongoController.createProduct);

router.put('/:id', protect, authorize('user'), validateProduct, mongoController.updateProduct);

router.delete('/:id', protect, authorize('user'), mongoController.deleteProduct);
router.patch('/:id', protect, authorize('user'), validatepatchProduct, mongoController.patchProduct);

module.exports = router