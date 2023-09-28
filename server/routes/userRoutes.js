const express = require('express');
const { authUser, registerUser, logoutUser, getProfile, updateProfile } = require('../controllers/userController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/auth', authUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);

router.route('/profile')
    .get(protect, getProfile)
    .put(protect, updateProfile);

module.exports = router;