const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviewsByProduct,
  getReviewsByUser,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { body, validationResult } = require("express-validator");

// Create a new review
router.post(
  "/",
  [
    body("userId").isMongoId().withMessage("Invalid user ID"),
    body("productId").isMongoId().withMessage("Invalid product ID"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("comment").isLength({ min: 5 }).withMessage("Comment must be at least 5 characters"),
  ],
  createReview
);

// Get reviews by product ID
router.get("/product/:productId", getReviewsByProduct);

// Get reviews by user ID
router.get("/user/:userId", getReviewsByUser);

// Update a review
router.put(
  "/:reviewId",
  [
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("comment").isLength({ min: 5 }).withMessage("Comment must be at least 5 characters"),
  ],
  updateReview
);

// Delete a review
router.delete("/:reviewId", deleteReview);

module.exports = router;
