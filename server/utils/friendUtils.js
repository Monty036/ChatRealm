const User = require('../models/User');

const findUsers = async (userId, friendId) => {

    let users = await User.find({
        $and: [
            { _id: { $ne: userId } },
            {
                $or: [
                    { username: { $regex: friendId } },
                    { email: { $regex: friendId } }
                ]
            }
        ]
    }, 'fullname username profilePic -_id').limit(10);

    return users;
};

module.exports = {
    findUsers,
};