import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_BACKEND_URI : ''}/api`;
const baseQuery = fetchBaseQuery({ baseUrl: URL, prepareHeaders(headers) { return headers }, credentials: 'include' });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) =>({})
});