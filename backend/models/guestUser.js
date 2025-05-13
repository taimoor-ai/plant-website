const mongoose = require("mongoose");

const guestUserSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("GuestUser", guestUserSchema);
