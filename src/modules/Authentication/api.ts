import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AuthenticationSessionInitialisationResponse from './Response/AuthenticationSessionInitialisationResponse';
import AuthenticateRequest from '@modules/Authentication/Request/AuthenticateRequest';
import {API_URL} from '@store/env';

export const authenticationApi = createApi({
  reducerPath: 'authenticationApi',
  baseQuery: fetchBaseQuery({baseUrl: API_URL}),
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
  }),
});

export default authenticationApi;
export const {
  useInitialiseAuthenticationSessionMutation,
  useAuthenticateMutation,
} = authenticationApi;
