import Profile from './Model/Profile';
import User from './Model/User';
import Lecturer from '@modules/Users/Model/Lecturer.ts';
import pocketUsosApi from '../../api/pocket-usos-api';

export const usersApi = pocketUsosApi.injectEndpoints({
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
