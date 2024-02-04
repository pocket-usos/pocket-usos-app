import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {ReactNativeLanguageDetector} from 'react-native-localization-settings';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';
import {en, pl} from './translations';

const resources = {
  en: {
    translation: en,
  },
  pl: {
    translation: pl,
  },
};

i18n
  .use(ReactNativeLanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'en',
    supportedLngs: ['pl', 'en'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
