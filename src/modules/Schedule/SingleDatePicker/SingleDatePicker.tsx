import React from 'react';
import {Text} from 'react-native-paper';
import styles from './styles';
import {TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/pl';
import {useTranslation} from 'react-i18next';

interface Props {
  chosenDate: Date;
  onPickDate: (date: Date) => void;
}

const SingleDatePicker: React.FC<Props> = ({chosenDate, onPickDate}) => {
  const {i18n} = useTranslation();
  moment.updateLocale(i18n.resolvedLanguage ?? 'en', {week: {dow: 1}});

  const toStartLetterUppercase = (str: string) =>
    str[0].toUpperCase() + str.slice(1);

  const isActive = (date: Date) => date.valueOf() === chosenDate.valueOf();

  const isWeekend = (date: Date) => date.getDay() === 6 || date.getDay() === 0;

  const getDates = (): Date[] => {
    const chosenWeekMonday = moment(chosenDate).weekday(0).toDate();
    const dates: Date[] = [];

    for (let daysCount = 0; daysCount < 7; daysCount++) {
      dates.push(moment(chosenWeekMonday).add(daysCount, 'd').toDate());
    }

    return dates;
  };

  return (
    <View style={styles.datePicker}>
      {getDates().map(d => (
        <TouchableOpacity
          key={d.getDate()}
          style={styles.item}
          onPress={() => onPickDate(d)}>
          <Text
            style={[
              styles.dayOfWeekText,
              isWeekend(d) ? styles.weekendText : null,
              isActive(d) ? styles.activeText : null,
            ]}>
            {toStartLetterUppercase(moment(d).format('ddd'))}
          </Text>
          <Text
            style={[
              styles.dateText,
              isWeekend(d) ? styles.weekendText : null,
              isActive(d) ? styles.activeText : null,
            ]}>
            {toStartLetterUppercase(moment(d).format('DD'))}
          </Text>
          {isActive(d) ? <View style={styles.activeDateIndicator} /> : null}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SingleDatePicker;
