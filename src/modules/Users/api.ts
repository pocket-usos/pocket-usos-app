import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Profile from './Model/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
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
        url: 'students/me',
        method: 'GET',
      }),
    }),
  }),
});

export default usersApi;
export const {useGetProfileQuery} = usersApi;
