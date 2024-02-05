import React from 'react';
import LoadableScreenView from '@components/LoadableScreenView/LoadableScreenView.tsx';
import ScheduleView from '@modules/Schedule/ScheduleView';

const ScheduleContainer: React.FC = () => {
  return (
    <LoadableScreenView isLoading={false}>
      <ScheduleView />
    </LoadableScreenView>
  );
};

export default ScheduleContainer;
