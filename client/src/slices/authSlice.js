import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userinfo: localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')): null,
}

const authSlice  = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, { payload }) {
            state.userinfo = payload;
            localStorage.setItem('userinfo', JSON.stringify(payload));
        },
        logout(state, action) {
            state.userinfo = null;
            localStorage.removeItem('userinfo');
        },
        updateFriendRequestState(state, { payload }) {
            if(state.userinfo?.friendRequests) {
                state.userinfo.friendRequests = state.userinfo.friendRequests.concat(payload);
            }
            else state.userinfo.friendRequests = payload;   
        }
    }
});

export const { setCredentials, logout, updateFriendRequestState } = authSlice.actions;

export default authSlice.reducer;

