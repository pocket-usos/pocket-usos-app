import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Term from './Model/Term';
import TermGrades from '@modules/Grades/Model/TermGrades.ts';
import {API_URL} from '@store/env.ts';

export const gradesApi = createApi({
  reducerPath: 'gradesApi',
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
    getTerms: builder.query<Term[], void>({
      query: () => ({
        url: 'calendar/terms',
        method: 'GET',
      }),
    }),
    getGrades: builder.query<TermGrades, string | undefined>({
      query: termId => ({
        url: 'grades',
        method: 'GET',
        params: {term: termId},
      }),
    }),
  }),
});

export default gradesApi;
export const {useGetTermsQuery, useGetGradesQuery} = gradesApi;
