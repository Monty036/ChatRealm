const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// UTILS
const generateToken = require('../utils/generateJwtToken');
const generateUsername = require('../utils/generateUsername');


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
        res.status(200).json({ message: "Login Successful.", data: user.getUserData() });
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
        res.status(201).json({ message: "Register Successful", data: user.getUserData() });
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
    res.status(200).json({ message: 'Logged out successfully' });
})

const getProfile = asyncHandler(async (req, res) => {
    if(!req.user) {
        res.status(401);
        throw new Error('Unauthorized Access to Protected Route. Please login again.');
    }
    res.status(200).json({ message: '/getProfile Successful', data: req.user });
})

const updateProfile = asyncHandler(async (req, res) => {
    if(!req.user) {
        res.status(401);
        throw new Error('Unauthorized Access to Protected Route. Please login again.');
    }

    const _id = req.user._id;
    
    // Prevent any request from updating user critical values
    delete req.body._id;
    delete req.body.email;
    delete req.body.password;
    const user = await User.findOneAndUpdate({ _id }, req.body, { new: true });

    if(user) {
        res.status(200).json({ message: '/updateProfile Successful', data: user.getUserData() });
    } else {
        res.status(400);
        throw new Error('No such user found. Please login again.');
    }
})


module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getProfile,
    updateProfile,
};
