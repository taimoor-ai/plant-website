const GuestUser = require("../models/guestUser");

exports.registerGuestUser = async (req, res) => { 
  try {
    const { guest_id } = req.body;
    console.log('Received guest_id:', guest_id);

    if (!guest_id) {
      return res.json({ message: "Provide guest_id", success: false });
    }

    const guestUser = await GuestUser.findOne({ guest_id }); // ✅ Mongoose syntax

    if (guestUser) {
      return res.json({ message: "User already registered", success: true }); // Optionally still success
    }

    await GuestUser.create({ guest_id });

    return res.json({ message: "User registered successfully", success: true });

  } catch (err) {
    console.error('Error in registerGuestUser:', err);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
