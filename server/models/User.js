const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ChatRoom = require('./ChatRoom');

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
        },
        friendRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'FriendRequest'
            }
        ]
    },
    {
        timestamps: true
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getUserData = function () {
    return this.getPublicUserData();
}

userSchema.methods.getPublicUserData = function() {
    return {
        user: {
            fullname: this.fullname,
            email: this.email,
            username: this.username,
            profilePic: this.profilePic,
        }
    };
}

userSchema.methods.getPrivateUserData = async function() {
    const data = await this.populate(
        [
            {
                path: 'chatRooms',
                select: 'chatRooms'
            },
            {
                path: 'friendRequests',
                select: 'toUser',
                populate: [
                    {
                        path: 'toUser',
                        select: 'username fullname profilePic -_id',
                    },
                    {
                        path: 'fromUser',
                        select: 'username fullname profilePic -_id'
                    }
                ] 
            },
        ],
    );
    const chatRooms = await Promise.all(data.chatRooms.map(async (doc) => (await ChatRoom.findById(doc._id))));
    const chatRoomData = await Promise.all(chatRooms.map(async (room) => await room.getRoom(this.username)));


    return {
        chatRoom: chatRoomData,
        friendRequests: data.friendRequests,
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