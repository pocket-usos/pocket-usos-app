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

const RootNavigation: React.FC = () => {
  const {isAuthenticated} = useSelector(
    (state: RootState) => state.authentication,
  );
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

  return (
    <NavigationContainer>
      <ScreenContainer isRoot={true}>
        {!isAuthenticated ? <AuthenticationNavigator /> : <MainNavigator />}
      </ScreenContainer>
    </NavigationContainer>
  );
};

export default RootNavigation;
