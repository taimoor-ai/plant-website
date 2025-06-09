const Staff = require("../models/Staff");
const { hashPassword, comparePassword } = require("../Utils/hashPassword");
const jwt = require("jsonwebtoken");
const cloudinary = require("../Config/cloudinary");
// Register new staff
const registerStaff = async (req, res) => {
  try {
    const { name, email, password, role, profileImage } = req.body;

    // Validate required fields
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and role are required fields.",
      });
    }

    // Check for existing email
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new staff
    const staff = await Staff.create({
      name: name || "",
      email,
      password: hashedPassword,
      role,
      profileImage: profileImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    });

    return res.status(201).json({
      success: true,
      message: "Staff registered successfully.",
      staff,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const staff = await Staff.findOne({ email });
    if (!staff)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password." });

    // Check if account is active
    if (staff.status === "inactive") {
      return res
        .status(403)
        .json({ success: false, message: "Account is not active. Please contact admin." });
    }

    const isMatch = await comparePassword(password, staff.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password." });

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: staff._id,
        email: staff.email,
        role: staff.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ token, success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all staff
const getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single staff by ID
const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found." });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete staff
const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Staff deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const toggleStaffStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    // Toggle status
    staff.status = staff.status === "active" ? "inactive" : "active";
    await staff.save();

    res.status(200).json({
      message: `Staff status updated to ${staff.status}`,
      staff,
    });
  } catch (error) {
    console.error("Toggle status error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const updateProfile=async (req, res) => {
  const { name, email, profileImage } = req.body;
  // console.log(name,email,profileImage)
  try {
    let imageUrl = null;

    // Upload base64 image to Cloudinary if it exists
    if (profileImage && profileImage.startsWith("data:image")) {
      const uploadRes = await cloudinary.uploader.upload(profileImage, {
        folder: "user_profiles",
      });
      imageUrl = uploadRes.secure_url;
    }
   console.log("imageUrl",imageUrl)
    const updatedUser = await Staff.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        ...(imageUrl && { profileImage: imageUrl }), // only update if image provided
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update user profile" });
  }
}

module.exports = {
  registerStaff,
  loginStaff,
  getAllStaff,
  getStaffById,
  deleteStaff,
  toggleStaffStatus,
  updateProfile
};
