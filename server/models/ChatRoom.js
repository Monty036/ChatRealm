const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxLength: 64
        },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        chatBlocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatBlock' }],
        maxUsers: {
            type: Number,
            min: 1,
            max: 1024,
            default: 2     // A ChatRoom with 2 members is a DM
        }
    },
    {
        timestamps: true
    }
);

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);

module.exports = ChatRoom;