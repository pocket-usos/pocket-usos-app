import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarItem from '@modules/Schedule/Model/CalendarItem.ts';
import GetScheduleRequest from '@modules/Schedule/Request/GetScheduleRequest.ts';
import moment from 'moment';

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
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
        url: 'calendar/my',
        method: 'GET',
        params: request
          ? {
              start: moment(request.start).format('YYYY-MM-D'),
              days: request.days,
            }
          : null,
      }),
    }),
  }),
});

export default scheduleApi;
export const {useGetMyScheduleQuery} = scheduleApi;
