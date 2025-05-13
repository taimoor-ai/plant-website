const { validationResult } = require("express-validator");
const Orders = require("../models/Orders");

// Create order
const createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array(), success: false });

  try {
    const order = new Orders(req.body);
    await order.save();
    res.status(201).json({ message: "Order placed successfully", order, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get orders by user
const getOrdersByUser = async (req, res) => {
  try {
    const { userId, userType } = req.params;
    const orders = await Orders.find({ "user.userId": userId, "user.userType": userType });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const order = await Orders.findByIdAndUpdate(req.params.orderId, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await Orders.findByIdAndDelete(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  updateOrderStatus,
  deleteOrder
};
