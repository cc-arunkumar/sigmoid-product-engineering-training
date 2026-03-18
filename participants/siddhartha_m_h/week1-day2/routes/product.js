const express = require('express')
const productController = require('../controllers/productController')
const validateProduct = require('../middleware/validateProduct')
const validateProductPartial = require('../middleware/validateProductPartial')

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById)
router.post('/', validateProduct, productController.createProduct);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', validateProduct, productController.updateProduct);
router.patch('/:id', validateProductPartial, productController.patchProduct);

module.exports = router;