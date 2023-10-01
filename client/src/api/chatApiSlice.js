import { apiSlice } from "../slices/apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getChat: builder.mutation({
            query: (data) => ({
                url: `/chat`,
                method: 'GET',
                credentials: 'include'
            })
        }),
        postChat: builder.mutation({
            query: (data) => ({
                url: `/chat`,
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        })
    })
})

export const { useGetChatMutation, usePostChatMutation } = chatApiSlice;