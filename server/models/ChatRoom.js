const mongoose = require('mongoose');
const ChatBlock = require('./ChatBlock');

const ChatRoomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxLength: 64,
            default: ""
        },
        chatRoomPic: {
            type: String,
            default: "/defaultProfilePic.png"
        },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        chatBlocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatBlock' }],
    },
    {
        timestamps: true
    }
);

ChatRoomSchema.methods.getRoom = async function (username) {
    await this.populate('users', 'fullname username email profilePic -_id');
    return {
        _id: this._id,
        title: this.title,
        chatRoomPic: this.chatRoomPic,
        users: this.users.filter((user) => user.username !== username),
        chats: (await this.getLatestMessages()).chats
    };
}

ChatRoomSchema.methods.getMessages = async function (chatBlockId) {  // id represents the chatBlock we are requesting
    // ChatBlock 'null' marks the end and start of a ChatBlock LinkedList
    if(chatBlockId === 'null') return [];
    if(!chatBlockId) return [];
    // Prevent accessing ChatBlocks from other ChatRooms
    if(!this.model('ChatRoom').findOne(
        { 
            _id: this._id,
            chatBlocks: { $in: [ chatBlockId ] }  
        }
    )) {
        return [];
    }
    const doc = await ChatBlock.findById(chatBlockId);
    await doc.populate('chats.user', 'username -_id');
    return doc;
}   

ChatRoomSchema.methods.getLatestMessages = async function () {
    if(!this.chatBlocks) return [];
    const lastBlockId = this.chatBlocks[this.chatBlocks.length - 1];
    return await this.getMessages(lastBlockId);
}

ChatRoomSchema.methods.addMessage = async function (message) {
    if(this.chatBlocks.length == 0) {
        const chatBlock = await ChatBlock.create({ chats: [ message ] });

        // Add to chatBlocks array
        this.chatBlocks.push(chatBlock._id);
        await this.save();
        return message;
    }
    const chatBlockId = this.chatBlocks[this.chatBlocks.length - 1];
    let chatBlock = await ChatBlock.findById(chatBlockId);
    if(chatBlock.getMessageCount() > 200) {
        let newChatBlock = await ChatBlock.create({ chats: [ message ], previousBlock: chatBlock._id });
        chatBlock.nextBlock = newChatBlock._id;
        await chatBlock.save();
        
        // Add to chatBlocks array
        this.chatBlocks.push(newChatBlock._id);
        this.save();

        return message;
    }

    await chatBlock.addMessage(message);
    return message;
    
}

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);

module.exports = ChatRoom;