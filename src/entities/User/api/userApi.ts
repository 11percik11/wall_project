import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userEndpoints } from './userEndpoints';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://book-memory.itlabs.top' }),
  endpoints: userEndpoints,
});

export const { 
  useGetUserQuery, 
  useLazyGetUserQuery,
  useGetUserByIdQuery,
  useGetFilteredUsersQuery,
  useLazyGetFilteredUsersQuery, 
} = userApi;