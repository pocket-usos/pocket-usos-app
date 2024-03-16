import CalendarItem from '@modules/Schedule/Model/CalendarItem.ts';
import GetScheduleRequest from '@modules/Schedule/Request/GetScheduleRequest.ts';
import moment from 'moment';
import pocketUsosApi from '../../api/pocket-usos-api';;

export const scheduleApi = pocketUsosApi.injectEndpoints({
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
  }),
});

export default scheduleApi;
export const {useGetMyScheduleQuery} = scheduleApi;
