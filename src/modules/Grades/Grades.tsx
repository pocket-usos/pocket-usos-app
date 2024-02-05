import React from 'react';
import LoadableScreenView from '@components/LoadableScreenView/LoadableScreenView.tsx';
import GradesView from '@modules/Grades/GradesView';

const GradesContainer: React.FC = () => {
  return (
    <LoadableScreenView isLoading={false}>
      <GradesView />
    </LoadableScreenView>
  );
};

export default GradesContainer;
