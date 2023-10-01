var jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);
      if(!user) {
        throw new Error('No Such User. Please logout and login again.');
      }
      req.user = {
        _id: user._id
      };
    
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error(`Error: ${error}`);
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
  next();
});

module.exports = { protect };