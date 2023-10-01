const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const getChat = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id);

    if(!user) {
        res.status(401);
        throw new Error('Unauthorized Request.');
    }

    res.status(200).json({
        ...(await user.getPrivateUserData()),
        message: 'GET /chat Successful',
    });
});

module.exports = {
    getChat,
};