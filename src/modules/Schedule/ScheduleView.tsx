import React, {useState} from 'react';
import {ActivityIndicator, Text} from 'react-native-paper';
import {SafeAreaPadding, useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {default as FontAwesomeIcon} from 'react-native-vector-icons/FontAwesome6';
import {default as IonIcon} from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import 'moment/locale/pl';
import SingleDatePicker from '@modules/Schedule/SingleDatePicker/SingleDatePicker.tsx';
import {configureCalendarLocale} from '../../../translations/calendarLocaleConfig.ts';
import CalendarModal from '@modules/Schedule/CalendarModal/CalendarModal.tsx';
import CalendarItem from '@modules/Schedule/Model/CalendarItem.ts';
import Timetable from 'react-native-calendar-timetable';

interface Props {
  chosenDate: Date;
  onChooseDate: (date: Date) => void;
  schedule?: CalendarItem[];
  isFetching: boolean;
}

const ScheduleView: React.FC<Props> = ({
  chosenDate,
  onChooseDate,
  schedule,
  isFetching,
}) => {
  const theme = useAppTheme();
  const {t, i18n} = useTranslation();

  const [calendarDatePickerVisible, setCalendarDatePickerVisible] =
    useState(false);
  configureCalendarLocale(i18n.language);

  const showCalendarPicker = () => setCalendarDatePickerVisible(true);
  const hideCalendarPicker = () => setCalendarDatePickerVisible(false);

  const isToday = () =>
    moment(chosenDate).startOf('day').isSame(moment().startOf('day'));

  const chosenMonthAndDay = moment(chosenDate).format('MMMM DD');
  const chosenDayOfWeek = isToday()
    ? t('Today')
    : moment(chosenDate).startOf('day').format('dddd');

  const toStartLetterUppercase = (str: string) =>
    str[0].toUpperCase() + str.slice(1);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.chosenDate}>
          {toStartLetterUppercase(chosenMonthAndDay)}
        </Text>
        <View style={styles.header}>
          <Text
            variant="headlineMedium"
            style={{color: theme.colors.neutral.black}}>
            {toStartLetterUppercase(chosenDayOfWeek)}
          </Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerAction}
              onPress={showCalendarPicker}>
              <Image
                source={require('../../../assets/images/calendar-icon.png')}
                style={styles.headerActionIcon}
              />
            </TouchableOpacity>
            <CalendarModal
              chosenDate={chosenDate}
              onChooseDate={onChooseDate}
              isVisible={calendarDatePickerVisible}
              hide={hideCalendarPicker}
            />
          </View>
        </View>
        <SingleDatePicker
          chosenDate={chosenDate}
          onPickDate={date => onChooseDate(date)}
        />
      </View>
      {schedule && (schedule?.length ?? 0) > 0 && !isFetching ? (
        <ScrollView style={styles.timetableView} horizontal={false}>
          <Timetable
            fromHour={8}
            toHour={22}
            hideNowLine={!isToday()}
            scrollViewProps={{horizontal: false}}
            width={Dimensions.get('screen').width - SafeAreaPadding * 2}
            style={{
              container: styles.timetableContainer,
              lines: styles.timetableLines,
              time: styles.timetableTimeText,
            }}
            items={schedule.map(item => {
              return {
                startDate: item.start,
                endDate: item.end,
                ...item,
              };
            })}
            renderItem={props => <TimetableItem {...props} />}
            date={chosenDate}
          />
        </ScrollView>
      ) : (
        <View>
          {isFetching ? (
            <View style={styles.loader}>
              <ActivityIndicator
                size="large"
                color={theme.colors.primary}
                style={styles.loaderAnimation}
              />
            </View>
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                {t("You don't have any classes on this day")}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

interface ItemProps {
  style: any;
  item: any;
}

const TimetableItem: React.FC<ItemProps> = ({style, item}) => {
  const theme = useAppTheme();
  const {t} = useTranslation();
  const title = item.name.split(' - ')[0];
  const isPast = moment(item.endDate).isBefore(moment());

  return (
    <View
      style={[
        style,
        styles.timetableItem,
        isPast ? styles.timetablePastItem : null,
      ]}>
      <Text style={styles.timetableItemTitle}>
        {title.slice(0, 50)} {title.length > 50 ? '...' : ''}
      </Text>
      <View style={styles.timetableItemAttribute}>
        <View style={styles.timetableItemIcon}>
          <FontAwesomeIcon
            name="location-dot"
            size={14}
            color={theme.colors.neutral.white}
          />
        </View>
        <Text style={styles.timetableItemText}>{`${t('Room')} ${
          item.room.name
        }`}</Text>
      </View>
      <View style={styles.timetableItemAttribute}>
        <View style={styles.timetableItemIcon}>
          <IonIcon name="person" size={14} color={theme.colors.neutral.white} />
        </View>
        <Text
          style={
            styles.timetableItemText
          }>{`${item.lecturers[0].firstName} ${item.lecturers[0].lastName}`}</Text>
      </View>
      <View style={styles.classTypeContainer}>
        <Text
          style={[
            styles.classTypeText,
            isPast ? styles.classTypeTextForPastItem : null,
          ]}>
          {item.classType.id}
        </Text>
      </View>
    </View>
  );
};

export default ScheduleView;
