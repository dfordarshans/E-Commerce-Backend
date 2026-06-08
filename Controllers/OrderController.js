const Order = require('../Models/OrderModel');

const placeOrder = async (req, res) => {
    try {
        const { userId, userName, email, items, total, delivery } = req.body;
        if (!items || items.length === 0) return res.status(400).json({ message: 'Cart is empty' });
        const order = await Order.create({ userId, userName, email, items, total, delivery });
        res.status(201).json({ message: 'Order placed successfully', data: order });
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error: error.message });
    }
};

const getOrdersByUser = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json({ message: 'Orders fetched', data: orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({ message: 'All orders fetched', data: orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const updated = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!updated) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order status updated', data: updated });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};

module.exports = { placeOrder, getOrdersByUser, getAllOrders, updateOrderStatus };
