import React, {useCallback, useEffect, useState} from 'react';
import ChooseUniversityView from './ChooseUniversityView';
import {
  useAuthenticateMutation,
  useGetUniversitiesQuery,
  useInitialiseAuthenticationSessionMutation,
} from '@modules/Authentication/api';
import AuthenticationSessionInitialisationResponse from '../Response/AuthenticationSessionInitialisationResponse';
import Response from '@store/Response';
import {useDispatch, useSelector} from 'react-redux';
import {Linking} from 'react-native';
import {RootState} from '@store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import queryString from 'query-string';
import AuthenticateRequest from '@modules/Authentication/Request/AuthenticateRequest.ts';
import {
  authenticate as authenticateState,
  startAuthentication,
  stopAuthentication,
} from '@modules/Authentication/state.ts';
import {showNotification} from '@modules/Notification/state.ts';
import LoadableScreenView from '@components/LoadableScreenView/LoadableScreenView.tsx';
import {useTranslation} from 'react-i18next';

const ChooseUniversityContainer: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [chosenUniversityId, setChosenUniversityId] = useState<string>();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [initialiseAuthenticationSession, {isLoading: isInitialising}] =
    useInitialiseAuthenticationSessionMutation();
  const [authenticate, {isLoading: isAuthenticating}] =
    useAuthenticateMutation();
  const {isAuthenticating: isAuthenticationFlowActive} = useSelector(
    (state: RootState) => state.authentication,
  );

  const {data: universities, isFetching: isFetchingUniversities} =
    useGetUniversitiesQuery();

  const onSignIn = async () => {
    if (chosenUniversityId === undefined) {
      return;
    }

    const response: Response<AuthenticationSessionInitialisationResponse> =
      await initialiseAuthenticationSession(chosenUniversityId);

    if (response.data) {
      const {sessionId, redirectUrl} = response.data;

      dispatch(startAuthentication());
      await AsyncStorage.setItem('sessionId', sessionId);
      await Linking.openURL(redirectUrl);
    } else {
      dispatch(stopAuthentication());
      dispatch(
        showNotification({
          type: 'error',
          message: t('Something went wrong, Please try again later'),
        }),
      );
    }
  };

  const handleUserRedirection = useCallback(
    async (event: {url: string}) => {
      const url = queryString.parseUrl(event.url);
      const requestToken = url.query.oauth_token?.toString();
      const verifier = url.query.oauth_verifier?.toString();

      const sessionId = await AsyncStorage.getItem('sessionId');

      if (sessionId && requestToken && verifier) {
        const authenticateRequest: AuthenticateRequest = {
          sessionId,
          requestToken,
          verifier,
        };

        const response: Response<void> = await authenticate(
          authenticateRequest,
        );

        if (response.error) {
          dispatch(stopAuthentication());
          dispatch(
            showNotification({
              type: 'error',
              message: t('Something went wrong, Please try again later'),
            }),
          );
        } else {
          dispatch(authenticateState());
        }
      } else {
        dispatch(stopAuthentication());
        dispatch(
          showNotification({
            type: 'error',
            message: t('Something went wrong, Please try again later'),
          }),
        );
      }
    },
    [dispatch, authenticate, t],
  );

  useEffect(() => {
    const listener = Linking.addEventListener('url', handleUserRedirection);

    const setChosenUniversity = async () => {
      const chosenUniversityId = await AsyncStorage.getItem(
        'chosenUniversityId',
      );

      if (chosenUniversityId) {
        setChosenUniversityId(chosenUniversityId);
      }
    };

    setChosenUniversity();

    return () => listener.remove();
  }, [handleUserRedirection]);

  const onUniversityChoose = async (universityId: string) => {
    await AsyncStorage.setItem('chosenUniversityId', universityId);
    setChosenUniversityId(universityId);
  };

  return (
    <LoadableScreenView
      isLoading={
        isInitialising || isAuthenticating || isAuthenticationFlowActive
      }>
      <ChooseUniversityView
        searchValue={searchValue}
        onSearchInput={(value: string) => setSearchValue(value)}
        universities={universities?.filter(
          u =>
            u.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            u.id === chosenUniversityId,
        )}
        chosenUniversityId={chosenUniversityId}
        onUniversityChoose={onUniversityChoose}
        onSignInPress={onSignIn}
        isFetchingUniversities={isFetchingUniversities}
      />
    </LoadableScreenView>
  );
};

export default ChooseUniversityContainer;
