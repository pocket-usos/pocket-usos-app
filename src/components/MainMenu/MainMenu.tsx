import React from 'react';
import MainMenuView from './MainMenuView';

interface Props {
  state: any;
  navigation: any;
}

export interface Route {
  key: string;
  name: string;
  params?: object;
}

const MainMenuContainer: React.FC<Props> = ({state, navigation}) => {
  return (
    <MainMenuView
      navigation={navigation}
      activeRouteIndex={state.index}
      routes={state.routes}
    />
  );
};

export default MainMenuContainer;
