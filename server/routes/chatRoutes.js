const express = require('express');
const router = express.Router();
const { getChat } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getChat);

module.exports = router;