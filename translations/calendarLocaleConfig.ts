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

  LocaleConfig.locales.en = {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: 'Today',
  };

  LocaleConfig.defaultLocale = currentLocale;
};
