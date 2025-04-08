import { EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { User, FilterUser } from '../model/types';

export const userEndpoints = (
  builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, never, 'userApi'>
) => ({
  getUser: builder.query<User[], { name?: string } | void>({
    query: (params) => {
      if (!params || !('name' in params) || !params.name) {
        return '/api/members';
      }
      return `/api/members?name=${encodeURIComponent(params.name)}`;
    },
  }),
  getUserById: builder.query<User, number>({
    query: (id) => `/api/members/${id}`,
    keepUnusedDataFor: 0,
  }),
  getFilteredUsers: builder.query<User[], FilterUser>({
    query: (params) => {
      const queryParams = new URLSearchParams();
      
      if (params.yearStart) queryParams.append('yearStart', params.yearStart.toString());
      if (params.yearEnd) queryParams.append('yearEnd', params.yearEnd.toString());
      if (params.rank) queryParams.append('ranks', params.rank.join(','));
      if (params.word) queryParams.append('word', params.word.join(','));

      return {
        url: `/api/members?${queryParams.toString()}`,
        method: 'GET',
      };
    },
  }),
});