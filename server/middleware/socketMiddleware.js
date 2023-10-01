const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const protect = async (socket, next) => {
  const cookies = cookie.parse(socket.handshake.headers.cookie);
  if(!cookies.jwt) {
    console.log('WS connection rejected: NO JWT');
    next(new Error('User not found. Please logout and login again.'))
  }
  else {
    const decoded = jwt.verify(cookies.jwt, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log('WS connection rejected: USER NOT FOUND');
      next(new Error('User not found. Please logout and login again.'));
    } else {
      socket.user = {
        _id: user._id,
        username: user.username
      };
      next();
    }
  }
}

module.exports = {
  protect,
};