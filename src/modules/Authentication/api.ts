import AuthenticationSessionInitialisationResponse from './Response/AuthenticationSessionInitialisationResponse';
import AuthenticateRequest from '@modules/Authentication/Request/AuthenticateRequest';
import pocketUsosApi from '../../api/pocket-usos-api';
import University from '@modules/Authentication/Model/University.ts';

export const authenticationApi = pocketUsosApi.injectEndpoints({
  endpoints: builder => ({
    getUniversities: builder.query<University[], void>({
      query: () => ({
        url: 'institutions',
        method: 'GET',
      }),
    }),
    initialiseAuthenticationSession: builder.mutation<
      AuthenticationSessionInitialisationResponse,
      string
    >({
      query: institutionId => ({
        url: 'authentication/sessions',
        method: 'POST',
        params: {
          institutionId,
        },
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
  useGetUniversitiesQuery,
  useInitialiseAuthenticationSessionMutation,
  useAuthenticateMutation,
  useSignOutMutation,
} = authenticationApi;
