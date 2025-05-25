const Accessory = require("../models/Accessories");
const { validationResult } = require("express-validator");
const fs = require("fs");
const cloudinary = require("../Config/cloudinary");
const addAccessory = async (req, res) => {
  console.log("i am call ")
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }
   // Validate image upload
   if (!req.files || req.files.length === 0) {
  
    return res.status(400).json({
      success: false,
      errors: [{ msg: "At least one image is required." }],
    });
  }

  try {
     const imageUrls = [];
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path);
        
          imageUrls.push(result.secure_url);
          fs.unlinkSync(file.path); // Delete temp file
        } 
        req.body.imageUrl = imageUrls; // Add image URLs to the request body
        const accessoryData = {
      name: req.body.name,
      description: req.body.description,
      stock: parseInt(req.body.stock),
      size: req.body.size,
      price: parseFloat(req.body.price),
      category: req.body.category,
      imageUrl: imageUrls,
    };//ensure this matches your schema
    const newAccessory = new Accessory(accessoryData);
    await newAccessory.save();
    res.status(201).json({ data: newAccessory, message: "Accessory added", success: true });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message, success: false });
  }
};

const getAllAccessories = async (req, res) => {
  try {
    const accessories = await Accessory.find();
    res.status(200).json({ data: accessories });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};

const getAccessoryById = async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id);
    if (!accessory) return res.status(404).json({ error: "Accessory not found" });
    res.status(200).json( accessory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAccessory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updated = await Accessory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Accessory not found" });
    res.status(200).json({ data: updated, message: "Accessory updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAccessory = async (req, res) => {
  try {
    const deleted = await Accessory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Accessory not found" });
    res.status(200).json({ message: "Accessory deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteAccessoriesMultiple = async (req, res) => {
  try {
    const { ids } = req.body; // Expecting: { ids: ["id1", "id2", ...] }
 console.log("i am call")
  console.log(ids)
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "No accessory IDs provided" });
    }

    const result = await Accessory.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No accessories found to delete" });
    }

    res.status(200).json({ message: `${result.deletedCount} accessory(s) deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAvailability = async (req, res) => {
  try {
    console.log("i am call")
    const { ids, availability } = req.body;

    if (!Array.isArray(ids) || typeof availability !== "boolean") {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const result = await Accessory.updateMany(
      { _id: { $in: ids } },
      { $set: { isavailable: availability } }
    );

    res.status(200).json({
      message: `Accessories marked as ${availability ? "available" : "unavailable"}`,
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error("Error updating availability:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addAccessory,
  getAllAccessories,
  getAccessoryById,
  updateAccessory,
  deleteAccessory,
  deleteAccessoriesMultiple,
  updateAvailability,
};
