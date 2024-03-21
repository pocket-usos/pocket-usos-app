import React, {useState} from 'react';
import LoadableScreenView from '@components/LoadableScreenView/LoadableScreenView.tsx';
import ScheduleView from '@modules/Schedule/ScheduleView';
import moment from 'moment';
import {useGetMyScheduleQuery} from './api';

const ScheduleContainer: React.FC = () => {
  const [chosenDate, chooseDate] = useState(moment().startOf('day').toDate());

  const {
    data: schedule,
    isFetching,
    refetch,
  } = useGetMyScheduleQuery({
    start: chosenDate,
    days: 1,
  });

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
    <LoadableScreenView isLoading={false}>
      <ScheduleView
        chosenDate={chosenDate}
        onChooseDate={chooseDate}
        schedule={schedule}
        isFetching={isFetching}
        isRefreshing={refreshing}
        onRefresh={onRefresh}
      />
    </LoadableScreenView>
  );
};

export default ScheduleContainer;
