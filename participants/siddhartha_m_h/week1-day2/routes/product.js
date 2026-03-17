const express = require('express')
const productController = require('../controllers/productController')
const validateProduct = require('../middleware/validateProduct')
const validateProductPartial = require('../middleware/validateProductPartial')

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById)
router.post('/', validateProduct, productController.handleAddProducts);
router.delete('/:id', productController.handleDeleteProductById);
router.put('/:id', validateProduct, productController.handleUpdateProducts);
router.patch('/:id', validateProductPartial, productController.handlePatchProduct);

module.exports = router;