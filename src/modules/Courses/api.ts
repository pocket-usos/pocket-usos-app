import Course from '@modules/Courses/Model/Course.ts';
import pocketUsosApi from '../../api/pocket-usos-api';;

export const coursesApi = pocketUsosApi.injectEndpoints({
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
