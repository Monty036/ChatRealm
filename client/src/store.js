import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './slices/authSlice';
import { apiSlice } from "./slices/apiSlice";
import chatRoomSlice from "./slices/chatRoomSlice";

const store = configureStore({
    reducer: {
        auth : authSliceReducer,
        chatRoom: chatRoomSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store;