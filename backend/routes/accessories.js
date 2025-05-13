const express = require("express");
const { body } = require("express-validator");
const {
  addAccessory,
  getAllAccessories,
  getAccessoryById,
  updateAccessory,
  deleteAccessory,
} = require("../controllers/accessoriesController");
const upload = require("../Config/multer");
const router = express.Router();

const accessoryValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("stock").isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
  body("size").isIn(["small", "medium", "large"]).withMessage("Size must be small, medium, or large"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  // body("imageUrl").isArray({ min: 1 }).withMessage("At least one image URL is required"),
  body("category").notEmpty().withMessage("Category is required"),
];

router.post("/add",upload.array("images") ,accessoryValidation, addAccessory);
router.get("/get", getAllAccessories);
router.get("/get/:id", getAccessoryById);
router.put("/:id", accessoryValidation, updateAccessory);
router.delete("/:id", deleteAccessory);

module.exports = router;
