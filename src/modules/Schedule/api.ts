import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarItem from '@modules/Schedule/Model/CalendarItem.ts';
import GetScheduleRequest, {
  GetLecturerScheduleRequest,
} from '@modules/Schedule/Request/GetScheduleRequest.ts';
import moment from 'moment';
import {API_URL} from '@store/env.ts';

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
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
    getMySchedule: builder.query<
      CalendarItem[],
      GetScheduleRequest | undefined
    >({
      query: request => ({
        url: 'schedule/my',
        method: 'GET',
        params: request
          ? {
              start: moment(request.start).format('YYYY-MM-D'),
              days: request.days,
            }
          : undefined,
      }),
    }),
    getLecturerSchedule: builder.query<
      CalendarItem[],
      GetLecturerScheduleRequest
    >({
      query: request => ({
        url: `schedule/lecturers/${request.lecturerId}`,
        method: 'GET',
        params: {
          start: request.start
            ? moment(request.start).format('YYYY-MM-D')
            : undefined,
          days: request.days,
        },
      }),
    }),
  }),
});

export default scheduleApi;
export const {useGetMyScheduleQuery, useGetLecturerScheduleQuery} = scheduleApi;
