import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Profile from './Model/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@store/env';
import User from './Model/User';
import Lecturer from '@modules/Users/Model/Lecturer.ts';

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
    getLecturer: builder.query<Lecturer, string>({
      query: lecturerId => ({
        url: `users/${lecturerId}`,
        method: 'GET',
      }),
    }),
  }),
});

export default usersApi;
export const {
  useGetProfileQuery,
  useGetUsersQuery,
  useGetUsersPhotosQuery,
  useGetLecturerQuery,
} = usersApi;
