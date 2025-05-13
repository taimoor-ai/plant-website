const Plant = require("../models/Plants");
const { validationResult } = require("express-validator");
const cloudinary = require("../Config/cloudinary");
const fs = require("fs");
// Create a new plant
const addPlant = async (req, res) => {
  console.log("i am call");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(validationResult(req).array());
    return res.status(400).json({ errors: errors.array(), success: false });
  }
  // Validate image upload

  try {
    let imageUrls = [];

    if (!req.body.imageUrl) {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          errors: [{ msg: "At least one image is required." }],
        });
      }

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
        fs.unlinkSync(file.path); // Delete temp file
      }
    }
    imageUrls = req.body.imageUrl;

    const plantData = {
      name: req.body.name,
      description: req.body.description,
      stock: parseInt(req.body.stock),
      size: req.body.size,
      price: parseFloat(req.body.price),
      category: req.body.category,
      light: req.body.light,
      water: req.body.water,
      imageUrl: imageUrls,
    }; //ensure this matches your schema

  
    const newPlant = new Plant(plantData);
    await newPlant.save();
    res
      .status(201)
      .json({
        plant: newPlant.toObject(),
        message: "Plant added successfully",
        success: true,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message, success: false });
  }
};

// Get all plants
const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find().lean();
    res.status(200).json(plants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific plant by ID
const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ error: "Plant not found" });
    }
    res.status(200).json(plant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a plant
const updatePlant = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPlant) {
      return res.status(404).json({ error: "Plant not found" });
    }
    res.status(200).json(updatedPlant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a plant
const deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) {
      return res.status(404).json({ error: "Plant not found" });
    }
    res.status(200).json({ message: "Plant deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addPlant,
  getAllPlants,
  getPlantById,
  updatePlant,
  deletePlant,
};
