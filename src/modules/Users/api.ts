import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Profile from './Model/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@store/env';
import User from './Model/User';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers: Headers): Promise<Headers> => {
      const sessionId = await AsyncStorage.getItem('sessionId');

      if (sessionId) {
        headers.set('Session-Id', sessionId);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getProfile: builder.query<Profile, void>({
      query: () => ({
        url: 'users/me',
        method: 'GET',
      }),
    }),
    getUser: builder.query<User, string>({
      query: userId => ({
        url: `users/${userId}`,
        method: 'GET',
      }),
    }),
    getUsers: builder.query<User[], string[]>({
      query: usersIds => ({
        url: 'users',
        method: 'GET',
        params: {
          usersIds,
        },
      }),
    }),
    getUsersPhotos: builder.query<{[id: string]: string}, string[]>({
      query: usersIds => ({
        url: 'users/photos',
        method: 'GET',
        params: {
          usersIds,
        },
      }),
    }),
  }),
});

export default usersApi;
export const {
  useGetProfileQuery,
  useGetUserQuery,
  useGetUsersQuery,
  useGetUsersPhotosQuery,
} = usersApi;
