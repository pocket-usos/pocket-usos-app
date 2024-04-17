import React, {useEffect, useRef, useState} from 'react';
import LoadableScreenView from '@components/LoadableScreenView/LoadableScreenView.tsx';
import ScheduleView from '@modules/Schedule/ScheduleView';
import moment from 'moment';
import {useGetMyScheduleQuery, useLazyGetMyScheduleQuery} from './api';
import CalendarItem, {Day} from './Model/CalendarItem';
import {refresh} from '@react-native-community/netinfo';

const ScheduleContainer: React.FC = () => {
  const [chosenDate, chooseDate] = useState(moment().startOf('day').toDate());
  const [days, setDays] = useState<Day[]>();
  const [refetchingSchedule, setRefetchingSchedule] = useState<boolean>(false);

  const {
    data: initialScheduleItems,
    isFetching: isFetchingInitialData,
    refetch,
  } = useGetMyScheduleQuery(
    {
      start: moment(chosenDate).subtract(1, 'day').toDate(),
      days: 3,
    },
    {skip: days !== undefined && days.length > 0 && !refetchingSchedule},
  );

  const [getScheduleForDay] = useLazyGetMyScheduleQuery();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setRefetchingSchedule(true);

    try {
      await refetch();
    } finally {
      setRefreshing(false);
      setRefetchingSchedule(false);
    }
  }, []);

  const scheduleCarousel = useRef(null);

  const getInitialSchedule = (schedule: CalendarItem[]): Day[] => {
    const days: Day[] = [];

    const chosenDay = moment(chosenDate);
    const previousDay = moment(chosenDay).subtract(1, 'day');
    const nextDay = moment(chosenDay).add(1, 'day');

    const previousDaySchedule = schedule.filter(
      s =>
        moment(s.start).format('YYYY-MM-DD') ===
        previousDay.format('YYYY-MM-DD'),
    );
    const chosenDaySchedule = schedule.filter(
      s =>
        moment(s.start).format('YYYY-MM-DD') === chosenDay.format('YYYY-MM-DD'),
    );
    const nextDaySchedule = schedule.filter(
      s =>
        moment(s.start).format('YYYY-MM-DD') === nextDay.format('YYYY-MM-DD'),
    );

    return [
      {schedule: previousDaySchedule, date: previousDay.toDate()},
      {schedule: chosenDaySchedule, date: chosenDay.toDate()},
      {schedule: nextDaySchedule, date: nextDay.toDate()},
    ];
  };

  useEffect(() => {
    if (initialScheduleItems) {
      setDays(getInitialSchedule(initialScheduleItems));
      setRefetchingSchedule(false);
    }
  }, [initialScheduleItems]);

  const onSnapToDay = async (index: number) => {
    if (days === undefined) {
      return;
    }

    const newChosenDate = days[index].date;
    chooseDate(newChosenDate);

    if (index === 0) {
      const previousDayDate: Date = moment(newChosenDate)
        .subtract(1, 'day')
        .toDate();
      const previousDaySchedule: CalendarItem[] = await getScheduleForDay({
        start: previousDayDate,
        days: 1,
      }).unwrap();

      const oldDays = [...days];
      oldDays.splice(-1);

      setDays([
        {schedule: previousDaySchedule, date: previousDayDate},
        ...oldDays,
      ]);
      scheduleCarousel.current?.snapToItem(1, false);
    }

    if (index === days.length - 1) {
      const nextDayDate: Date = moment(newChosenDate).add(1, 'day').toDate();
      const nextDaySchedule: CalendarItem[] = await getScheduleForDay({
        start: nextDayDate,
        days: 1,
      }).unwrap();

      const oldDays = [...days];
      oldDays.shift();

      setDays([...oldDays, {schedule: nextDaySchedule, date: nextDayDate}]);
      scheduleCarousel.current?.snapToItem(1, false);
    }
  };

  const onChooseDate = (date: Date) => {
    const daysDates = days?.map(day => moment(day.date).format('YYYY-MM-DD'));

    if (daysDates && daysDates.includes(moment(date).format('YYYY-MM-DD'))) {
      scheduleCarousel.current?.snapToItem(
        daysDates.findIndex(d => d === moment(date).format('YYYY-MM-DD')),
        true,
      );
    } else {
      setRefetchingSchedule(true);
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
