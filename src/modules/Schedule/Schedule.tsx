import React, {useEffect, useRef, useState} from 'react';
import LoadableScreenView from '@components/LoadableScreenView/LoadableScreenView.tsx';
import ScheduleView from '@modules/Schedule/ScheduleView';
import moment, {Moment} from 'moment';
import {useGetMyScheduleQuery} from './api';
import CalendarItem, {Day} from './Model/CalendarItem';

const ScheduleContainer: React.FC = () => {
  const [chosenDate, chooseDate] = useState(moment().startOf('day').toDate());
  const [days, setDays] = useState<Day[]>();

  const {
    data: initialScheduleItems,
    isFetching: isFetchingInitialData,
    refetch,
  } = useGetMyScheduleQuery({
    start: moment(chosenDate).weekday(0).toDate(),
    days: 7,
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, []);

  const scheduleCarousel = useRef(null);

  const getInitialSchedule = (schedule: CalendarItem[]): Day[] => {
    const chosenDay = moment(chosenDate);
    const monday = moment(chosenDay).weekday(0);

    const dates: Moment[] = [];

    for (let daysCount = 0; daysCount < 7; daysCount++) {
      dates.push(moment(monday).add(daysCount, 'd'));
    }

    return dates.map(date => {
      return {
        schedule: schedule.filter(
          s =>
            moment(s.start).format('YYYY-MM-DD') === date.format('YYYY-MM-DD'),
        ),
        date: date.toDate(),
      };
    });
  };

  useEffect(() => {
    if (initialScheduleItems) {
      const initialSchedule = getInitialSchedule(initialScheduleItems);
      setDays(initialSchedule);

      const daysDates = initialSchedule.map(day =>
        moment(day.date).format('YYYY-MM-DD'),
      );

      scheduleCarousel.current?.snapToItem(
        daysDates.findIndex(d => d === moment(chosenDate).format('YYYY-MM-DD')),
        false,
      );
    }
  }, [chosenDate, initialScheduleItems, scheduleCarousel]);

  const onSnapToDay = async (index: number) => {
    if (days === undefined) {
      return;
    }

    const newChosenDate = days[index].date;
    chooseDate(newChosenDate);
  };

  const onChooseDate = (date: Date) => {
    const daysDates = days?.map(day => moment(day.date).format('YYYY-MM-DD'));

    if (daysDates && daysDates.includes(moment(date).format('YYYY-MM-DD'))) {
      scheduleCarousel.current?.snapToItem(
        daysDates.findIndex(d => d === moment(date).format('YYYY-MM-DD')),
        true,
      );
    } else {
      chooseDate(date);
    }
  };

  return (
    <LoadableScreenView isLoading={false}>
      <ScheduleView
        chosenDate={chosenDate}
        onChooseDate={onChooseDate}
        days={days}
        isFetching={isFetchingInitialData}
        isRefreshing={refreshing}
        onRefresh={onRefresh}
        onSnapToDay={onSnapToDay}
        scheduleCarousel={scheduleCarousel}
      />
    </LoadableScreenView>
  );
};

export default ScheduleContainer;
