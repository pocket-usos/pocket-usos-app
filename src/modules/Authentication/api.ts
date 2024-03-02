import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AuthenticationSessionInitialisationResponse from './Response/AuthenticationSessionInitialisationResponse';
import AuthenticateRequest from '@modules/Authentication/Request/AuthenticateRequest';
import {API_URL} from '@store/env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
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
    initialiseAuthenticationSession: builder.mutation<
      AuthenticationSessionInitialisationResponse,
      void
    >({
      query: () => ({
        url: 'authentication/sessions',
        method: 'POST',
      }),
    }),
    authenticate: builder.mutation<void, AuthenticateRequest>({
      query: request => ({
        url: `authentication/sessions/${request.sessionId}`,
        method: 'PATCH',
        body: {
          ...request,
        },
      }),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: 'authentication/logout',
        method: 'POST',
      }),
    }),
  }),
});

export default authenticationApi;
export const {
  useInitialiseAuthenticationSessionMutation,
  useAuthenticateMutation,
  useSignOutMutation,
} = authenticationApi;
