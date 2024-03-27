import React, {useEffect, useState} from 'react';
import NotificationsView from './NotificationsView';
import {
  useGetNotificationsQuery,
  useReadNotificationsMutation,
} from '@modules/Notification/api.ts';

interface Props {
  navigation: any;
}

const NotificationsContainer: React.FC<Props> = ({navigation}) => {
  const {data: notifications, isLoading, refetch} = useGetNotificationsQuery();
  const [read, {isLoading: isReading, isSuccess: wasSuccessfullyRead}] =
    useReadNotificationsMutation();

  useEffect(() => {
    if (!isReading && wasSuccessfullyRead) {
      refetch();
    }
  }, [isReading, wasSuccessfullyRead]);

  const readNotifications = (notificationIds: string[]) => {
    read(notificationIds);
  };

  const goBack = () => navigation.navigate('Home');

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <NotificationsView
      notifications={notifications}
      readNotifications={readNotifications}
      goBack={goBack}
      isFetching={isLoading}
      isRefreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default NotificationsContainer;
