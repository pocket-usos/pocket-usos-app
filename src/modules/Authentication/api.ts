import AuthenticationSessionInitialisationResponse from './Response/AuthenticationSessionInitialisationResponse';
import AuthenticateRequest from '@modules/Authentication/Request/AuthenticateRequest';
import pocketUsosApi from '../../api/pocket-usos-api';

export const authenticationApi = pocketUsosApi.injectEndpoints({
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
