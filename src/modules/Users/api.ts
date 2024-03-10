import Profile from './Model/Profile';
import User from './Model/User';
import pocketUsosApi from '../../api/pocket-usos-api';;

export const usersApi = pocketUsosApi.injectEndpoints({
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
