const express = require("express");
const { body, param, query, validationResult } = require("express-validator");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateProductQuantity,
  removeProduct,
  clearCart
} = require("../controllers/CartController");

// Add to cart - Validate input
router.post(
  "/add",
  [
    body("userId").notEmpty().withMessage("Invalid userId format."),
    body("userType").isIn(["User", "GuestUser","admin"]).withMessage("Invalid userType."),
    body("productId").isMongoId().withMessage("Invalid productId format."),
    body("modelType").isIn(["accessories", "plants"]).withMessage("Invalid modelType."),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1."),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  addToCart
);

// Get cart - Validate userId and userType
router.get(
  "/:userType/:userId",
  [
    param("userId").notEmpty().withMessage("Invalid userId format."),
    param("userType").isIn(["User", "GuestUser"]).withMessage("Invalid userType."),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  getCart
);

// Update product quantity in cart - Validate input
router.put(
  "/update",
  [
    body("userId").isMongoId().withMessage("Invalid userId format."),
    body("userType").isIn(["User", "GuestUser"]).withMessage("Invalid userType."),
    body("productId").isMongoId().withMessage("Invalid productId format."),
    body("modelType").isIn(["accessories", "plants"]).withMessage("Invalid modelType."),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1."),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateProductQuantity
);

// Remove product from cart - Validate input
router.delete(
  "/remove",
  [
    body("userId").isMongoId().withMessage("Invalid userId format."),
    body("userType").isIn(["User", "GuestUser"]).withMessage("Invalid userType."),
    body("productId").isMongoId().withMessage("Invalid productId format."),
    body("modelType").isIn(["accessories", "plants"]).withMessage("Invalid modelType."),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  removeProduct
);

// Clear cart - Validate userId and userType
router.delete(
  "/clear/:userType/:userId",
  [
    param("userId").notEmpty().withMessage("Invalid userId format."),
    param("userType").isIn(["User", "GuestUser","admin"]).withMessage("Invalid userType."),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  clearCart
);

module.exports = router;
