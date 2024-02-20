import React, {useState} from 'react';
import LoadableScreenView from '@components/LoadableScreenView/LoadableScreenView.tsx';
import ScheduleView from '@modules/Schedule/ScheduleView';
import moment from 'moment';
import {useGetMyScheduleQuery} from './api';

const ScheduleContainer: React.FC = () => {
  const [chosenDate, chooseDate] = useState(moment().startOf('day').toDate());

  const {data: schedule, isFetching} = useGetMyScheduleQuery({
    start: chosenDate,
    days: 1,
  });

  return (
    <LoadableScreenView isLoading={false}>
      <ScheduleView
        chosenDate={chosenDate}
        onChooseDate={chooseDate}
        schedule={schedule}
        isFetching={isFetching}
      />
    </LoadableScreenView>
  );
};

export default ScheduleContainer;
