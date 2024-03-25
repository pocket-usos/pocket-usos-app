import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@store/store';
import AuthenticationNavigator from './Authentication/AuthenticationNavigator';
import MainNavigator from '@navigation/Main/MainNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  authenticate,
  stopAuthentication,
} from '@modules/Authentication/state.ts';
import ScreenContainer from '@components/ScreenContainer/ScreenContainer';
import NetworkError from '@modules/Errors/NetworkError.tsx';
import ServerConnectionError from '@modules/Errors/ServerConnectionError.tsx';

const RootNavigation: React.FC = () => {
  const {isAuthenticated} = useSelector(
    (state: RootState) => state.authentication,
  );
  const {error} = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialise = async () => {
      const sessionId = await AsyncStorage.getItem('sessionId');

      if (sessionId !== null) {
        dispatch(authenticate());
      } else {
        dispatch(stopAuthentication());
      }
    };

    initialise();
  }, [dispatch]);

  if (error && error.type === 'network') {
    return <NetworkError />;
  }

  if (error && error.type === 'server') {
    return <ServerConnectionError />;
  }

  return (
    <NavigationContainer>
      <ScreenContainer isRoot={true}>
        {!isAuthenticated ? <AuthenticationNavigator /> : <MainNavigator />}
      </ScreenContainer>
    </NavigationContainer>
  );
};

export default RootNavigation;
