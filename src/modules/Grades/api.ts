import Term from './Model/Term';
import TermGrades from '@modules/Grades/Model/TermGrades.ts';
import pocketUsosApi from '../../api/pocket-usos-api';;

export const gradesApi = pocketUsosApi.injectEndpoints({
  endpoints: builder => ({
    getTerms: builder.query<Term[], void>({
      query: () => ({
        url: 'schedule/terms',
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
