const express = require('express');
const router = express.Router();
const { placeOrder, getOrdersByUser, getAllOrders, updateOrderStatus } = require('../Controllers/OrderController');

router.post('/', placeOrder);
router.get('/', getAllOrders);
router.get('/user/:userId', getOrdersByUser);
router.put('/:id/status', updateOrderStatus);

module.exports = router;
