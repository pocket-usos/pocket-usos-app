import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {ReactNativeLanguageDetector} from 'react-native-localization-settings';
import {en, pl} from './translations';
import 'intl-pluralrules';

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
    compatibilityJSON: 'v4',
    resources,
    fallbackLng: 'en',
    debug: true,
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
