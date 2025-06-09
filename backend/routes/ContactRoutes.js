const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getAllMessages,
  replyToMessage
} = require('../controllers/ContactController');

// Public route
router.post('/contact', sendMessage);

// Admin routes
router.get('/admin/messages', getAllMessages);
router.put('/admin/messages/:id/reply', replyToMessage);

module.exports = router;
