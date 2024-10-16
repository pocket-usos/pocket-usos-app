import pocketUsosApi from '../../api/pocket-usos-api';
import Notification from './Model/Notification';

export const notificationsApi = pocketUsosApi.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => ({
        url: 'notifications',
        method: 'GET',
      }),
    }),
    getOneSignalExternalId: builder.query<{id: string}, void>({
      query: () => ({
        url: 'notifications/external-id',
        method: 'GET',
      }),
    }),
    readNotifications: builder.mutation<void, string[]>({
      query: notificationIds => ({
        url: 'notifications/read',
        method: 'PUT',
        body: {
          notificationIds,
        },
      }),
    }),
  }),
});

export default notificationsApi;
export const {
  useGetNotificationsQuery,
  useReadNotificationsMutation,
  useLazyGetOneSignalExternalIdQuery,
} = notificationsApi;
