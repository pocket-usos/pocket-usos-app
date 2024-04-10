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
import {OneSignal} from 'react-native-onesignal';
import Config from 'react-native-config';
import {useTranslation} from 'react-i18next';
import {useLazyGetOneSignalExternalIdQuery} from '@modules/Notification/api';

const RootNavigation: React.FC = () => {
  const {isAuthenticated} = useSelector(
    (state: RootState) => state.authentication,
  );
  const {error} = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();
  const [getExternalId] = useLazyGetOneSignalExternalIdQuery();
  const {i18n} = useTranslation();

  useEffect(() => {
    const initialise = async () => {
      const sessionId = await AsyncStorage.getItem('sessionId');

      if (sessionId !== null) {
        dispatch(authenticate());
      } else {
        dispatch(stopAuthentication());
      }

      const {id: externalId} = await getExternalId().unwrap();

      if (externalId) {
        OneSignal.initialize(Config.ONESIGNAL_APP_ID);
        OneSignal.Notifications.requestPermission(true);

        OneSignal.User.setLanguage(i18n.resolvedLanguage ?? 'en');
        OneSignal.login(externalId);
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
