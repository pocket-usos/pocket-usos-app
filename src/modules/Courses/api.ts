import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Course from '@modules/Courses/Model/Course.ts';
import {API_URL} from '@store/env';

export const coursesApi = createApi({
  reducerPath: 'coursesApi',
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
    getCourses: builder.query<
      Course[],
      {termId?: string; withSchedule?: boolean}
    >({
      query: request => ({
        url: 'courses',
        method: 'GET',
        params: {
          term: request.termId,
          withSchedule: request.withSchedule ?? false,
        },
      }),
    }),
    getCourse: builder.query<Course, {courseId: string; courseUnitId: string}>({
      query: request => ({
        url: `courses/${request.courseId}`,
        method: 'GET',
        params: {
          courseUnitId: request.courseUnitId,
        },
      }),
    }),
  }),
});

export default coursesApi;
export const {useGetCoursesQuery, useGetCourseQuery} = coursesApi;
