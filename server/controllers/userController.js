const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// UTILS
const generateToken = require('../utils/generateJwtToken');
const generateUsername = require('../utils/generateUsername');
const { findUsers } = require('../utils/friendUtils');


const authUser = asyncHandler(async (req, res) => {
    
    // id can be email or username
    const { id, password } = req.body;

    let user;
    if(id.includes("@")) {
        user = await User.findOne({ email: id });
    } else {
        user = await User.findOne({ username: id });
    }

    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({ message: "/auth Successful.", data: user.getUserData() });
    } else {
        res.status(401);
        throw new Error("Invalid Email or password!");
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    // Check for duplicate email
    const userExists = await User.findOne({ email });
    if(userExists) {
        res.status(400);
        throw new Error('User Already Exists.');
    }

    // Create temporary username from email
    const username = await generateUsername(email);
    const user = await User.create({ fullname, email, password, username });

    if(user) {
        generateToken(res, user._id);
        res.status(201).json({ message: "/register Successful", data: user.getUserData() });
    } else {
        res.status(400);
        throw new Error('Invalid User Data.');
    }

})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: '/logout Successful' });
})

const findUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { friendId } = req.body;

    res.status(200).json({ message: "/find_user Successful", data: await findUsers(_id, friendId) });
});

const addFriendRequest = asyncHandler(async (req, res) => {
    const { toUser: toUsername } = req.body;
    const fromUser = await User.findById(req.user._id);

    // Check if the toUser exists
    const toUser = await User.findOne({ username: toUsername }, 'friendRequests');
    if(!toUser) {
        res.status(400);
        throw new Error('Could not send Friend Request. User not found.');
    } 
    const toUserId = toUser._id;

    // Check for a already pending request to toUser
    await fromUser.populate('friendRequests', 'toUser');
    const duplicate = fromUser.friendRequests.filter((fr) => fr.toUser === toUserId);
    if(duplicate.length > 0) {
        res.status(400);
        throw new Error('Friend Request has already sent.');
    } 
    
    const fromUserId = fromUser._id;
    
    const friendRequest = await FriendRequest.create({ fromUser: fromUserId, toUser: toUserId });
    fromUser.friendRequests.push(friendRequest._id);
    toUser.friendRequests.push(friendRequest._id);

    await fromUser.save();
    await toUser.save();
    await friendRequest.populate([
        {
            path: 'toUser',
            select: 'fullname username profilePic -_id'
        },
        {
            path: 'fromUser',
            select: 'fullname username profilePic -_id'
        }
    ]);
    res.json({ message: 'POST /user/friend Successful', data: friendRequest });
});

module.exports = {
    authUser,
    registerUser,
    logoutUser,
    findUser,
    addFriendRequest
};
