const express = require('express');
const { authUser, registerUser, logoutUser, getProfile, updateProfile, findUser, addFriendRequest } = require('../controllers/userController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/auth', authUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);

router.route('/find_user').post(protect, findUser);

router.route('/friend').post(protect, addFriendRequest);

module.exports = router;