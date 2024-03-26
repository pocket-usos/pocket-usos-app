import React, {useState} from 'react';
import LoadableScreenView from '@components/LoadableScreenView/LoadableScreenView.tsx';
import HomeView from '@modules/Home/HomeView';
import {useGetProfileQuery} from '@modules/Users/api.ts';
import {useGetMyScheduleQuery} from '@modules/Schedule/api';
import moment from 'moment';
import {useGetNotificationsQuery} from '@modules/Notification/api.ts';

const HomeContainer: React.FC = () => {
  const [today] = useState(
    moment({hour: 0, minute: 0, second: 0}).tz('Europe/Warsaw').toDate(),
  );
  const {
    data: profile,
    isLoading: isLoadingProfile,
    isFetching: isFetchingProfile,
    refetch: refetchProfile,
  } = useGetProfileQuery();
  const {
    data: schedule,
    isLoading: isLoadingSchedule,
    isFetching: isFetchingSchedule,
    refetch: refetchSchedule,
  } = useGetMyScheduleQuery({
    start: today,
    days: 7,
  });

  const {
    data: notifications,
    isFetching: isFetchingNotifications,
    refetch: refetchNotifications,
  } = useGetNotificationsQuery();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await refetchProfile();
      await refetchSchedule();
      await refetchNotifications();
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <LoadableScreenView isLoading={isLoadingProfile || isLoadingSchedule}>
      <HomeView
        profile={profile}
        schedule={schedule}
        isRefreshing={refreshing}
        onRefresh={onRefresh}
        unreadNotificationsCount={
          notifications?.filter(n => !n.wasRead).length ?? 0
        }
      />
    </LoadableScreenView>
  );
};

export default HomeContainer;
