import React from 'react';
import LoadableScreenView from '@components/LoadableScreenView/LoadableScreenView.tsx';
import HomeView from '@modules/Home/HomeView';

const HomeContainer: React.FC = () => {
  return (
    <LoadableScreenView isLoading={false}>
      <HomeView />
    </LoadableScreenView>
  );
};

export default HomeContainer;
