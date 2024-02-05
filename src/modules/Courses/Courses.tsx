import React from 'react';
import LoadableScreenView from '@components/LoadableScreenView/LoadableScreenView.tsx';
import CoursesView from '@modules/Courses/CoursesView';

const CoursesContainer: React.FC = () => {
  return (
    <LoadableScreenView isLoading={false}>
      <CoursesView />
    </LoadableScreenView>
  );
};

export default CoursesContainer;
