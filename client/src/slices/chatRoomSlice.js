import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatRoom: [],
    currChatRoom: null
};

const chatRoomSlice  = createSlice({
    name: 'chatRoom',
    initialState,
    reducers: {
        setChatRoom(state, { payload }) {
            state.chatRoom = payload;
        },
        changeCurrChatRoom(state, { payload }) {
            state.currChatRoom = payload;
        },
        resetChatRoom(state) {
            state.chatRoom = [];
            state.currChatRoom = null;
        },
    }
});

export const { setChatRoom, changeCurrChatRoom, resetChatRoom } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;

