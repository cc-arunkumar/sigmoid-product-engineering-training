const express = require('express');
const orderController = require('../controllers/orderController')

const router = express.Router();

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.handleAddOrder);
router.delete('/:id', orderController.handleDeleteOrderById);
router.put('/:id', orderController.handleUpdateOrder);
router.patch('/:id', orderController.handlePatchOrder);

module.exports = router;