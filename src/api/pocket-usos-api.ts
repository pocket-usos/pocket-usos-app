import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from '@store/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../i18n.config';
import {Platform} from 'react-native';

const pocketUsosApi = createApi({
  reducerPath: 'pocketUsosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers: Headers): Promise<Headers> => {
      const sessionId = await AsyncStorage.getItem('sessionId');

      if (sessionId) {
        headers.set('Session-Id', sessionId);
      }

      if (i18n.resolvedLanguage) {
        headers.set('Accept-Language', i18n.resolvedLanguage);
      }

      headers.set('Platform', Platform.OS);

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default pocketUsosApi;
