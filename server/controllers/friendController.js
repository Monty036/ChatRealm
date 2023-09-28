const User = require('../models/User');
const ChatRoom = require('../models/ChatRoom');
const ChatBlock = require('../models/ChatBlock');

const findUsers = asyncHandler(async (req, res) => {
    const { id } = req.body;

    let users = await User.find({
        $or: [
            { username: { $regex: id } },
            { email: { $regex: id } }
        ]
    }, { fullname: 1, username: 1, profilePic: 1 }).limit(10);

    res.status(200).json({ message: '/findUsers', data: users });
});

const addFriend = asyncHandler(async (req, res) => {

    const { id } = req.body;

    const friend = await User.findById(id, {  });
});
