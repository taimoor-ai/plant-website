const express = require("express");
const { body, param } = require("express-validator");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/OrderController");

const router = express.Router();

// Create a new order
router.post(
  "/create",
  [
    body("user.userId").isMongoId().withMessage("Valid userId is required"),
    body("user.userType").isIn(["User", "GuestUser"]).withMessage("userType must be User or GuestUser"),
    body("products").isArray({ min: 1 }).withMessage("At least one product is required"),
    body("products.*.productId").isMongoId().withMessage("Each productId must be valid"),
    body("products.*.modelType").isIn(["accessories", "plants"]).withMessage("Invalid modelType"),
    body("products.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    body("totalPrice").isNumeric().withMessage("Total price must be a number")
  ],
  createOrder
);

// Get all orders
router.get("/", getAllOrders);

// Get order by order ID
router.get("/:orderId", param("orderId").isMongoId().withMessage("Invalid order ID"), getOrderById);

// Get orders by user
router.get("/user/:userType/:userId", [
  param("userId").isMongoId(),
  param("userType").isIn(["User", "GuestUser"])
], getOrdersByUser);

// Update order status
router.put("/update-status/:orderId", [
  param("orderId").isMongoId(),
  body("status").isIn(["pending", "shipped", "delivered", "cancelled"]).withMessage("Invalid status")
], updateOrderStatus);

// Delete an order
router.delete("/:orderId", param("orderId").isMongoId(), deleteOrder);

module.exports = router;
