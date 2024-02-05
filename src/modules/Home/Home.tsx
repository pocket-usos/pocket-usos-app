import React from 'react';
import LoadableScreenView from '@components/LoadableScreenView/LoadableScreenView.tsx';
import HomeView from '@modules/Home/HomeView';
import {MainStackParamList} from '@navigation/Main/MainNavigator.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type NavigationProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const HomeContainer: React.FC<NavigationProps> = ({navigation}) => {
  return (
    <LoadableScreenView isLoading={false}>
      <HomeView />
    </LoadableScreenView>
  );
};

export default HomeContainer;
