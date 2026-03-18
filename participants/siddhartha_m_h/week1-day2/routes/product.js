const express = require('express')
const productController = require('../controllers/productController')
const validateProduct = require('../middleware/validateProduct')
const protect = require('../middleware/authMiddleware')
const validateProductPartial = require('../middleware/validateProductPartial')
const authorize = require('../middleware/authorize')
const cache = require('../middleware/cache')

const router = express.Router();

router.get('/', cache(60000), productController.getAllProducts);
router.get('/:id', cache(60000), productController.getProductById);



router.post('/', protect, authorize("user"),validateProduct, productController.createProduct);
router.delete('/:id', protect, authorize("user"), productController.deleteProduct);
router.put('/:id', protect, authorize("admin"), validateProduct, productController.updateProduct);
router.patch('/:id', protect, authorize("admin"), validateProductPartial, productController.patchProduct);

module.exports = router;