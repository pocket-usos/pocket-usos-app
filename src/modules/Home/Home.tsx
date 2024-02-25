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
  const {data: profile, isFetching: isFetchingProfile} = useGetProfileQuery();
  const {data: schedule, isFetching: isFetchingSchedule} =
    useGetMyScheduleQuery({
      start: today,
      days: 7,
    });

  return (
    <LoadableScreenView isLoading={isFetchingProfile || isFetchingSchedule}>
      <HomeView profile={profile} schedule={schedule} />
    </LoadableScreenView>
  );
};

export default HomeContainer;
