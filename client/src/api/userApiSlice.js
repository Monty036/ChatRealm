import { apiSlice } from "../slices/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `/user/auth`,
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `/user/register`,
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `/user/logout`,
                method: 'POST',
                credentials: 'include'
            })
        }),
        findUser: builder.mutation({
            query: (data) => ({
                url: `/user/find_user`,
                method: 'POST',
                credentials: 'include',
                body: data
            })
        }),
        addFriend: builder.mutation({
            query: (data) => ({
                url: `/user/friend`,
                method: 'POST',
                credentials: 'include',
                body: data
            })
        }),
    })
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useFindUserMutation, useAddFriendMutation } = userApiSlice;