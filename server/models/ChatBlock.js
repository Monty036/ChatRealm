const mongoose = require('mongoose');

const Chat = new mongoose.Schema(
    {
        message: {
            type: String,
            maxLength: 10000,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true
    }
);

const ChatBlockSchema = new mongoose.Schema(
    {
        chats: [ Chat ]
    },
    {
        timestamps: true
    }
);

const ChatBlock = mongoose.model('ChatBlock', ChatBlockSchema);

module.exports = ChatBlock;