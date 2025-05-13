const express = require("express");
const { body, param, validationResult } = require("express-validator");
const upload = require("../Config/multer")
const router = express.Router();
const {
  addPlant,
  getAllPlants,
  getPlantById,
  updatePlant,
  deletePlant,
} = require("../controllers/plantsController");

// Create a new plant
router.post(
  "/plants/add",
  upload.array("images"),
  [
    body("name").not().isEmpty().withMessage("Name is required."),
    body("description").not().isEmpty().withMessage("Description is required."),
    body("stock").isInt({ min: 0 }).withMessage("Stock must be a non-negative integer."),
    body("size").isIn(["small", "medium", "large"]).withMessage("Size must be one of: small, medium, large."),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0."),
    // body("imageUrl").isArray().withMessage("Image URLs must be an array."),
    body("category").not().isEmpty().withMessage("Category is required."),
    body("light").isIn(["low", "medium", "high"]).withMessage("Light level must be one of: low, medium, high."),
    body("water").isIn(["low", "medium", "high"]).withMessage("Water level must be one of: low, medium, high."),
  ],
  addPlant
);

// Get all plants
router.get("/plants", getAllPlants);

// Get a specific plant by ID
router.get(
  "/plants/:id",
  [param("id").isMongoId().withMessage("Invalid plant ID format.")],
  getPlantById
);

// Update a plant
router.put(
  "/plants/:id",
  [
    param("id").isMongoId().withMessage("Invalid plant ID format."),
    body("name").optional().not().isEmpty().withMessage("Name is required."),
    body("description").optional().not().isEmpty().withMessage("Description is required."),
    body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a non-negative integer."),
    body("size").optional().isIn(["small", "medium", "large"]).withMessage("Size must be one of: small, medium, large."),
    body("price").optional().isFloat({ gt: 0 }).withMessage("Price must be greater than 0."),
    body("imageUrl").optional().isArray().withMessage("Image URLs must be an array."),
    body("category").optional().not().isEmpty().withMessage("Category is required."),
    body("light").optional().isIn(["low", "medium", "high"]).withMessage("Light level must be one of: low, medium, high."),
    body("water").optional().isIn(["low", "medium", "high"]).withMessage("Water level must be one of: low, medium, high."),
  ],
  updatePlant
);

// Delete a plant
router.delete(
  "/plants/:id",
  [param("id").isMongoId().withMessage("Invalid plant ID format.")],
  deletePlant
);

module.exports = router;
