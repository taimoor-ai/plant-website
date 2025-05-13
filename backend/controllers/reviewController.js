const Review = require("../models/Reviews.js");
const { validationResult } = require("express-validator");

// Create a new review
const createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json({ message: "Review created successfully", success: true, review: newReview });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

// Get reviews by product ID
const getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).populate('userId', 'name');
    if (!reviews) {
      return res.status(404).json({ error: "No reviews found for this product" });
    }
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get reviews by user ID
const getReviewsByUser = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId }).populate('productId', 'name');
    if (!reviews) {
      return res.status(404).json({ error: "No reviews found for this user" });
    }
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a review
const updateReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.reviewId, req.body, { new: true });
    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json({ message: "Review updated successfully", review: updatedReview });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createReview,
  getReviewsByProduct,
  getReviewsByUser,
  updateReview,
  deleteReview,
};
