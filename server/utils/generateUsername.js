const User = require('../models/User');

const generateUsername = async (email) => {
    const username = email.split("@")[0];

    if(!(await User.findOne({ username }))) {
        return username;
    }

    let suffix = 0;
    
    while(await User.findOne({ username: username + suffix.toString() })) {
        suffix++;
    }

    return username + suffix;
}

module.exports = generateUsername;