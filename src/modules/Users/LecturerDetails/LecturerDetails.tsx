import React, {useState} from 'react';
import LoadableScreenView from '@components/LoadableScreenView/LoadableScreenView.tsx';
import LecturerDetailsView from './LecturerDetailsView';
import {useGetLecturerQuery} from '../api';
import {useGetLecturerScheduleQuery} from '@modules/Schedule/api.ts';
import moment from 'moment';

interface Props {
  navigation: any;
  route: any;
}

const LecturerDetailsContainer: React.FC<Props> = ({navigation, route}) => {
  const {data: lecturer, isFetching} = useGetLecturerQuery(
    route.params.lecturerId,
  );

  const [startWeekday] = useState<Date>(moment().weekday(0).toDate());

  const {data: schedule, isFetching: isFetchingSchedule} =
    useGetLecturerScheduleQuery(
      {
        lecturerId: lecturer?.id ?? '',
        start: startWeekday,
        days: 7,
      },
      {skip: lecturer === undefined},
    );

  const goBack = () =>
    navigation.navigate(
      route.params.previousScreen,
      route.params.previousScreenParams,
    );

  return (
    <LoadableScreenView isLoading={isFetching}>
      {!isFetching && lecturer ? (
        <LecturerDetailsView
          mainColor={route.params.color}
          goBack={goBack}
          lecturer={lecturer}
          schedule={schedule}
          isFetchingSchedule={isFetchingSchedule}
        />
      ) : null}
    </LoadableScreenView>
  );
};

export default LecturerDetailsContainer;
