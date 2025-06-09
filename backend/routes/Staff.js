const express = require("express");
const router = express.Router();
const upload = require("../Config/multer");
const {
  registerStaff,
  loginStaff,
  getAllStaff,
  getStaffById,
  deleteStaff,
 toggleStaffStatus,
 updateProfile
} = require("../controllers/staffController");

// POST /api/staff/register
router.post("/register", registerStaff);

// POST /api/staff/login
router.post("/login", loginStaff);

// GET /api/staff
router.get("/", getAllStaff);

// GET /api/staff/:id
router.get("/:id", getStaffById);

// DELETE /api/staff/:id
router.delete("/:id", deleteStaff);
router.post("/:id", toggleStaffStatus);
router.put("/:id",upload.single("profileImage"),updateProfile)
module.exports = router;
