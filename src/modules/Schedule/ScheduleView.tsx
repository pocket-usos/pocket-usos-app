import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {SafeAreaPadding, useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {default as FontAwesomeIcon} from 'react-native-vector-icons/FontAwesome6';
import {default as IonIcon} from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/pl';
import SingleDatePicker from '@modules/Schedule/SingleDatePicker/SingleDatePicker.tsx';
import {configureCalendarLocale} from '../../../translations/calendarLocaleConfig.ts';
import CalendarModal from '@modules/Schedule/CalendarModal/CalendarModal.tsx';
import CalendarItem, {Day} from '@modules/Schedule/Model/CalendarItem.ts';
import Timetable from 'react-native-calendar-timetable';
import {useNavigation} from '@react-navigation/native';
import tinycolor from 'tinycolor2';
import Carousel from 'react-native-snap-carousel';

interface Props {
  chosenDate: Date;
  onChooseDate: (date: Date) => void;
  days?: Day[];
  isFetching: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onSnapToDay: (index: number) => void;
  scheduleCarousel: React.MutableRefObject<any>;
}

const ScheduleView: React.FC<Props> = ({
  chosenDate,
  onChooseDate,
  days,
  isFetching,
  isRefreshing,
  onRefresh,
  onSnapToDay,
  scheduleCarousel,
}) => {
  const theme = useAppTheme();
  const {t, i18n} = useTranslation();
  moment.updateLocale(i18n.resolvedLanguage ?? 'en', {week: {dow: 1}});
  const navigation = useNavigation();

  const [calendarDatePickerVisible, setCalendarDatePickerVisible] =
    useState(false);
  configureCalendarLocale(i18n.language);

  const showCalendarPicker = () => setCalendarDatePickerVisible(true);
  const hideCalendarPicker = () => setCalendarDatePickerVisible(false);

  const isToday = () =>
    moment(chosenDate).startOf('day').isSame(moment().startOf('day'));

  const chosenMonthAndDay = moment(chosenDate)
    .format('LL')
    .replace(/\d{4}/, '')
    .replace(',', '')
    .trim();
  const chosenDayOfWeek = isToday()
    ? t('Today')
    : moment(chosenDate).startOf('day').format('dddd');

  const toStartLetterUppercase = (str: string) =>
    str[0].toUpperCase() + str.slice(1);

  const toFirstLetterUppercase = (str: string) => {
    const strings = str.split(' ');

    const capitalizedStrings = strings.map(s => toStartLetterUppercase(s));

    return capitalizedStrings.join(' ');
  };

  const getScheduleMinHour = (scheduleForDay: CalendarItem[]) => {
    const startHours = scheduleForDay?.map(item => moment(item.start).hour());

    return Math.min(...startHours);
  };

  const nowIsLowerThanScheduleMinHour = (scheduleForDay: CalendarItem[]) => {
    const minHour = getScheduleMinHour(scheduleForDay);
    const nowHour = moment().hour();

    return nowHour < minHour;
  };

  const goToCourseScreen = (
    courseId: string,
    courseUnitId: number,
    color: string,
  ) => {
    navigation.navigate('SingleCourse', {
      courseId,
      courseUnitId: courseUnitId.toString(),
      color,
      previousScreen: 'Schedule',
    });
  };

  const getItemBackgroudColor = (index: number) => {
    const colors = [
      theme.colors.secondary,
      theme.colors.semantic.error,
      theme.colors.primary,
    ];

    return colors[index % colors.length];
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.chosenDate}>
          {toFirstLetterUppercase(chosenMonthAndDay)}
        </Text>
        <View style={styles.header}>
          <Text
            variant="headlineMedium"
            style={{color: theme.colors.neutral.black}}>
            {toStartLetterUppercase(chosenDayOfWeek)}
          </Text>
          <View style={styles.headerActions}>
            {!isToday() ? (
              <Button
                mode="outlined"
                compact
                style={styles.goToTodayButton}
                contentStyle={styles.goToTodayButtonContent}
                labelStyle={styles.goToTodayButtonLabel}
                onPress={() => onChooseDate(moment().toDate())}>
                {t('Today')}
              </Button>
            ) : null}
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
      {days && (days?.length ?? 0) > 0 && !isFetching ? (
        <Carousel
          ref={scheduleCarousel}
          useScrollView
          loop={false}
          sliderWidth={Dimensions.get('screen').width - SafeAreaPadding * 2}
          itemWidth={Dimensions.get('screen').width - SafeAreaPadding * 2}
          firstItem={days.findIndex(
            d =>
              moment(d.date).format('YYYY-MM-DD') ===
              moment(chosenDate).format('YYYY-MM-DD'),
          )}
          onSnapToItem={onSnapToDay}
          lockScrollWhileSnapping
          data={days}
          containerCustomStyle={styles.timetableView}
          renderItem={({item}) => (
            <ScrollView
              horizontal={false}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                />
              }>
              {item.schedule.length > 0 ? (
                <Timetable
                  fromHour={getScheduleMinHour(item.schedule)}
                  toHour={21}
                  hideNowLine={
                    !isToday() || nowIsLowerThanScheduleMinHour(item.schedule)
                  }
                  hourHeight={72}
                  scrollViewProps={{horizontal: false}}
                  width={Dimensions.get('screen').width - SafeAreaPadding * 2}
                  style={{
                    container: styles.timetableContainer,
                    lines: styles.timetableLines,
                    time: styles.timetableTimeText,
                    nowLine: {
                      dot: styles.timetableNowDot,
                      line: styles.timetableNowLine,
                    },
                  }}
                  items={item.schedule.map((item, index) => {
                    return {
                      startDate: item.start,
                      endDate: item.end,
                      backgroundColor: getItemBackgroudColor(index),
                      onPress: () =>
                        goToCourseScreen(
                          item.courseId,
                          item.courseUnitId,
                          getItemBackgroudColor(index),
                        ),
                      ...item,
                    };
                  })}
                  renderItem={props => <TimetableItem {...props} />}
                  date={item.date}
                />
              ) : (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}>
                    {t("You don't have any classes on this day")}
                  </Text>
                </View>
              )}
            </ScrollView>
          )}
        />
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
          ) : null}
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
    <Pressable
      onPress={item.onPress}
      style={[
        style,
        styles.timetableItem,
        {backgroundColor: item.backgroundColor},
        isPast
          ? {
              backgroundColor: tinycolor(item.backgroundColor)
                .lighten(15)
                .toString(),
            }
          : null,
      ]}>
      <Text style={styles.timetableItemTitle}>
        {title.slice(0, 50).trim()}
        {title.length > 50 ? '...' : ''}
      </Text>
      <View style={styles.timetableItemAttribute}>
        <View style={styles.timetableItemIcon}>
          <FontAwesomeIcon
            name="clock"
            solid
            size={14}
            color={theme.colors.neutral.white}
          />
        </View>
        <Text style={styles.timetableItemText}>
          {moment(item.startDate).format('HH:mm')} -{' '}
          {moment(item.endDate).format('HH:mm')}
        </Text>
      </View>
      {item.room ? (
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
      ) : null}
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
    </Pressable>
  );
};

export default ScheduleView;
