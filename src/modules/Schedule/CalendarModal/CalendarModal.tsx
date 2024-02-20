import React from 'react';
import {Modal, Portal} from 'react-native-paper';
import {useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import styles from '../styles';
import moment from 'moment';
import 'moment/locale/pl';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {configureCalendarLocale} from '../../../../translations/calendarLocaleConfig.ts';

interface Props {
  chosenDate: Date;
  onChooseDate: (date: Date) => void;
  isVisible: boolean;
  hide: () => void;
}

const CalendarModal: React.FC<Props> = ({
  chosenDate,
  onChooseDate,
  isVisible,
  hide,
}) => {
  const theme = useAppTheme();
  const {i18n} = useTranslation();

  const locale = i18n.language.split('-')[0];
  configureCalendarLocale(locale);

  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={hide} style={styles.calendarModal}>
        <Calendar
          firstDay={1}
          style={styles.calendar}
          onDayPress={date => {
            onChooseDate(new Date(date.timestamp));
            hide();
          }}
          markedDates={{
            [moment(chosenDate).format('YYYY-MM-DD')]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
          theme={{
            arrowColor: theme.colors.primary,
            todayTextColor: theme.colors.primary,
            selectedDayBackgroundColor: theme.colors.primary,
          }}
        />
      </Modal>
    </Portal>
  );
};

export default CalendarModal;
