import React, {useEffect, useRef, useState} from 'react';
import {Text} from 'react-native-paper';
import styles from './styles';
import {Dimensions, Pressable, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/pl';
import {useTranslation} from 'react-i18next';
import Carousel from 'react-native-snap-carousel';
import {default as FontAwesomeIcon} from 'react-native-vector-icons/FontAwesome6';
import theme, {SafeAreaPadding} from '@styles/theme.ts';

interface Props {
  chosenDate: Date;
  onPickDate: (date: Date) => void;
}

interface Week {
  dates: Date[];
}

const SingleDatePicker: React.FC<Props> = ({chosenDate, onPickDate}) => {
  const {i18n} = useTranslation();
  moment.updateLocale(i18n.resolvedLanguage ?? 'en', {week: {dow: 1}});

  const toStartLetterUppercase = (str: string) =>
    str[0].toUpperCase() + str.slice(1);

  const isActive = (date: Date) =>
    moment(date).date() === moment(chosenDate).date();

  const isWeekend = (date: Date) => date.getDay() === 6 || date.getDay() === 0;

  const getInitialWeeks = (): Week[] => {
    const initialWeeks: Week[] = [];

    initialWeeks.push({dates: getDates(-1)});
    initialWeeks.push({dates: getDates(0)});
    initialWeeks.push({dates: getDates(1)});

    return initialWeeks;
  };

  const getDates = (
    index: number,
    newChosenDate: Date | null = null,
  ): Date[] => {
    const date = moment(newChosenDate ?? chosenDate).add(index, 'week');
    const weekMonday = date.weekday(0).toDate();
    const dates: Date[] = [];

    for (let daysCount = 0; daysCount < 7; daysCount++) {
      dates.push(moment(weekMonday).add(daysCount, 'd').toDate());
    }

    return dates;
  };

  const [weeks, setWeeks] = useState<Week[]>(getInitialWeeks());
  const datePickerCarousel = useRef(null);

  useEffect(() => {
    setWeeks(getInitialWeeks());
    datePickerCarousel.current?.snapToItem(1, false);
  }, [chosenDate]);

  const onSnapToWeek = (index: number) => {
    const newChosenDate = weeks[index].dates[0];

    if (index === 0) {
      const previousWeek: Week = {dates: getDates(-1, newChosenDate)};

      const oldWeeks = [...weeks];
      oldWeeks.splice(-1);

      setWeeks([previousWeek, ...oldWeeks]);
    }

    if (index === weeks.length - 1) {
      const nextWeek: Week = {dates: getDates(1, newChosenDate)};

      const oldWeeks = [...weeks];
      oldWeeks.shift();

      setWeeks([...oldWeeks, nextWeek]);
    }

    onPickDate(newChosenDate);
  };

  return (
    <View style={styles.datePicker}>
      <Pressable
        style={styles.datePickerPreviousControl}
        onPress={() => datePickerCarousel.current?.snapToPrev()}>
        <FontAwesomeIcon
          name={'chevron-left'}
          solid
          size={16}
          color={theme.colors.primary}
        />
      </Pressable>
      <Carousel
        ref={datePickerCarousel}
        loop={false}
        sliderWidth={Dimensions.get('screen').width - SafeAreaPadding * 2}
        itemWidth={Dimensions.get('screen').width - SafeAreaPadding * 2}
        firstItem={1}
        onSnapToItem={onSnapToWeek}
        lockScrollWhileSnapping
        data={weeks}
        renderItem={({item}) => (
          <View style={styles.datePickerWeek}>
            {item.dates.map(d => (
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
                {isActive(d) ? (
                  <View style={styles.activeDateIndicator} />
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      <Pressable
        style={styles.datePickerNextControl}
        onPress={() => datePickerCarousel.current?.snapToNext()}>
        <FontAwesomeIcon
          name={'chevron-right'}
          solid
          size={16}
          color={theme.colors.primary}
        />
      </Pressable>
    </View>
  );
};

export default SingleDatePicker;
