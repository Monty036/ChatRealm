const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim:true,
            maxLength: 64
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            maxLength: 64
        },
        profilePic: {
            type: String,
            default: '/defaultProfilePic.png'
        },
        password: {
            type: String,
            required: true,
        },
        chatRooms: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' }]
        }
    },
    {
        timestamps: true
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getUserData = function() {
    return {
        fullname: this.fullname,
        email: this.email,
        username: this.username,
        profilePic: this.profilePic,
    };
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;