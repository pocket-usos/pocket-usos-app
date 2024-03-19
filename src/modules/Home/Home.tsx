import React, {useState} from 'react';
import LoadableScreenView from '@components/LoadableScreenView/LoadableScreenView.tsx';
import HomeView from '@modules/Home/HomeView';
import {useGetProfileQuery} from '@modules/Users/api.ts';
import {useGetMyScheduleQuery} from '@modules/Schedule/api';
import moment from 'moment';

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

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await refetchProfile();
      await refetchSchedule();
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
      />
    </LoadableScreenView>
  );
};

export default HomeContainer;
