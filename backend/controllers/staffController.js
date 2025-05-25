const Staff = require("../models/Staff");
const { hashPassword, comparePassword } = require("../Utils/hashPassword");
const jwt = require("jsonwebtoken");
// Register new staff
const registerStaff = async (req, res) => {
  try {
    const { name, email, password, role, profileImage } = req.body;

    const existingStaff = await Staff.findOne({ email });
    if (existingStaff)
      return res.status(400).json({ message: "Email already exists." });

    const hashedPassword = await hashPassword(password);

    const staff = await Staff.create({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage,
    });

    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginStaff = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const staff = await Staff.findOne({ email });
      if (!staff)
        return res.status(400).json({ success:false,  message: "Invalid email or password." });
  
      const isMatch = await comparePassword(password, staff.password);
      if (!isMatch)
        return res.status(400).json({ success:false,message: "Invalid email or password." });
  
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
  
      // Send only token in response
      res.status(200).json({ token:token,success:true });
    } catch (error) {
      res.status(500).json({success:false, message: error.message });
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

module.exports = {
  registerStaff,
  loginStaff,
  getAllStaff,
  getStaffById,
  deleteStaff,
};
