import {LocaleConfig} from 'react-native-calendars';

export const configureCalendarLocale = (currentLocale: string) => {
  LocaleConfig.locales.pl = {
    monthNames: [
      'Styczeń',
      'Luty',
      'Marzec',
      'Kwiecień',
      'Maj',
      'Czerwiec',
      'Lipiec',
      'Sierpień',
      'Wrzesień',
      'Pażdziernik',
      'Listopad',
      'Grudzień',
    ],
    monthNamesShort: [
      'Sty',
      'Lut',
      'Mar',
      'Kwi',
      'Maj',
      'Cze',
      'Lip',
      'Sie',
      'Wrz',
      'Paź',
      'Lis',
      'Gru',
    ],
    dayNames: [
      'Niedziela',
      'Poniedziałek',
      'Wtorek',
      'Śrioda',
      'Czwartek',
      'Piątek',
      'Sobota',
    ],
    dayNamesShort: ['Ndz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
    today: 'Dzisiaj',
  };

  LocaleConfig.defaultLocale = currentLocale;
};
