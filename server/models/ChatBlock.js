const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            maxLength: 1000,
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true
    }
);

const ChatBlockSchema = new mongoose.Schema(
    {
        chats: {
            type: [ ChatSchema ],
        },
        nextBlock: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatBlock', default: 'null' },
        previousBlock: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatBlock', default: 'null' }
    },
    {
        timestamps: true
    }
);

ChatBlockSchema.methods.getMessageCount = async function () {
    return this.chats.length;
}

ChatBlockSchema.methods.addMessage = async function (message) {
    this.chats.push(message);
    await this.save();
}

const ChatBlock = mongoose.model('ChatBlock', ChatBlockSchema);

module.exports = ChatBlock;