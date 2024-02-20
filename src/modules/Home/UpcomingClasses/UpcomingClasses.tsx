import React from 'react';
import UpcomingClassesView from './UpcomingClassesView';
import CalendarItem from '@modules/Schedule/Model/CalendarItem.ts';
import moment from 'moment';
import 'moment-timezone';

interface Props {
  schedule?: CalendarItem[];
}

const UpcomingClassesContainer: React.FC<Props> = ({schedule}) => {
  const filteredSchedule = schedule
    ? [schedule.filter(item => moment(item.start).isAfter(moment()))[0]]
    : undefined;

  return <UpcomingClassesView schedule={filteredSchedule} />;
};

export default UpcomingClassesContainer;
