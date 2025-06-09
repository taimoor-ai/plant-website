const ContactMessage = require('../models/Message');

// Send message (POST /api/contact)
exports.sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const newMessage = new ContactMessage({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: 'Thanks for Message over team reply soon On Your Provided Email' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Get all messages (GET /api/admin/messages)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Reply to a message (PUT /api/admin/messages/:id/reply)
exports.replyToMessage = async (req, res) => {
  try {
    const { reply } = req.body;

    const updated = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { reply, isReplied: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    res.status(200).json({ success: true, message: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
