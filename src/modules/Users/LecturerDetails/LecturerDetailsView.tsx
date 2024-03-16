import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {URL} from 'react-native-url-polyfill';
import {SafeAreaPadding, useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {
  Dimensions,
  Image,
  Linking,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {default as FontAwesomeIcon} from 'react-native-vector-icons/FontAwesome6';
import Lecturer from '@modules/Users/Model/Lecturer.ts';
import CalendarItem from '@modules/Schedule/Model/CalendarItem.ts';
import Timetable from 'react-native-calendar-timetable';
import moment from 'moment';

interface Props {
  lecturer: Lecturer;
  schedule?: CalendarItem[];
  isFetchingSchedule: boolean;
  mainColor: string;
  goBack: () => void;
}

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gi;

const LecturerDetailsView: React.FC<Props> = ({
  lecturer,
  schedule,
  isFetchingSchedule,
  mainColor,
  goBack,
}) => {
  const theme = useAppTheme();
  const {t} = useTranslation();

  const isFocused = useIsFocused();
  const scrollViewRef = useRef<ScrollView>();
  const [showAllCourses, setShowAllCourses] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused) {
      scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: false});
    }

    setShowAllCourses(false);
  }, [isFocused]);

  const getBaseUrl = (urlString: string): string => {
    const url = new URL(urlString);

    return url.hostname;
  };

  const renderTextWithLinks = (value: string) => {
    const stringValuesSplitByNewLine = value.split('\n');
    const stringValues: string[] = [];

    stringValuesSplitByNewLine.forEach(str => {
      const splitBySpace = str.split(' ');
      splitBySpace.forEach(splitStr => stringValues.push(splitStr.trim()));
    });

    return stringValues.map((str, idx) => {
      const linkMatch = str.match(URL_REGEX);
      if (linkMatch && linkMatch.length > 0) {
        return (
          <Text
            key={idx}
            style={styles.linkText}
            onPress={async () => await Linking.openURL(str)}>
            {getBaseUrl(str) + ' '}
          </Text>
        );
      } else {
        return <Text key={idx}>{str + ' '}</Text>;
      }
    });
  };

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const getTimetableLastDate = (dates: CalendarItem[]): Date => {
    if (
      dates.filter(
        item =>
          moment(item.start).day() === 0 || moment(item.start).day() === 6,
      ).length > 0
    ) {
      return moment().weekday(6).toDate();
    } else {
      return moment().weekday(4).toDate();
    }
  };

  const getLecturerCourses = () => {
    if (showAllCourses) {
      return lecturer.courses;
    } else {
      return lecturer.courses?.slice(lecturer.courses?.length - 5);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, {backgroundColor: mainColor}]}>
        <Pressable onPress={goBack} style={styles.backButton}>
          <FontAwesomeIcon
            name="chevron-left"
            solid
            size={16}
            color={theme.colors.neutral.white}
          />
          <Text style={styles.backButtonText}>{t('Back')}</Text>
        </Pressable>
        <View style={styles.lecturerHeader}>
          <Image
            source={{uri: lecturer.photoUrl}}
            style={styles.lecturerPhoto}
          />
          <View>
            <Text style={styles.lecturerTitle}>
              {`${lecturer.title ?? ''} ${lecturer.firstName} ${
                lecturer.lastName
              }`.trim()}
            </Text>
            <Text style={styles.lecturerEmail}>{lecturer.email}</Text>
          </View>
        </View>
        <Button
          onPress={async () =>
            await Linking.openURL(`mailto:${lecturer.email}`)
          }
          mode="outlined"
          rippleColor={theme.colors.neutral.white + '0A'}
          style={styles.sendEmailButton}
          labelStyle={styles.sendEmailButtonLabel}>
          {t('Send email')}
        </Button>
      </View>
      <ScrollView
        style={{
          paddingHorizontal: SafeAreaPadding,
          paddingTop: 12,
        }}>
        {lecturer.officeHoursInformation &&
        lecturer.officeHoursInformation.trim().length > 0 ? (
          <View style={styles.lecturerAttribute}>
            <View style={styles.lecturerAttributeHeader}>
              <Text style={styles.lecturerAttribureLabel}>
                {t('Consultations')}
              </Text>
            </View>
            <Text style={styles.consultationText}>
              {renderTextWithLinks(lecturer.officeHoursInformation)}
            </Text>
          </View>
        ) : null}

        {lecturer.courses?.length > 0 ? (
          <View style={styles.lecturerAttribute}>
            <View style={styles.lecturerAttributeHeader}>
              <Text style={styles.lecturerAttribureLabel}>
                {t('Courses conducted')}
              </Text>
              <Text
                style={styles.seeAllButton}
                onPress={() => setShowAllCourses(!showAllCourses)}>
                {showAllCourses ? t('Hide') : t('See all')}
              </Text>
            </View>
            {getLecturerCourses()?.map((course, idx) => (
              <Text key={`${idx}-${course.id}`} style={styles.conductedCourse}>
                <Text style={{fontWeight: '600'}}>{course.term.id + ': '}</Text>
                {course.name}
                <Text
                  style={styles.conductedCourseId}>{` [${course.id}]`}</Text>
              </Text>
            ))}
          </View>
        ) : null}

        <View style={styles.lecturerAttribute}>
          <View style={styles.lecturerAttributeHeader}>
            <Text style={styles.lecturerAttribureLabel}>{t('Schedule')}</Text>
            <Text style={styles.seeAllButton} onPress={() => {}}>
              {t('See all')}
            </Text>
          </View>

          {isFetchingSchedule || schedule === undefined ? (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color={theme.colors.primary} />
            </View>
          ) : (
            <View>
              <Timetable
                fromHour={8}
                toHour={21}
                hideNowLine={true}
                width={Dimensions.get('screen').width}
                columnWidth={150}
                hourHeight={28}
                linesLeftInset={0}
                columnHorizontalPadding={4}
                enableSnapping={true}
                renderHeader={({date}) =>
                  capitalize(moment(date).format('ddd'))
                }
                items={schedule.map(item => {
                  return {
                    startDate: item.start,
                    endDate: item.end,
                    ...item,
                  };
                })}
                style={{
                  lines: styles.timetableLines,
                  time: styles.timetableTimeText,
                  headerText: styles.timetableHeaderText,
                }}
                renderItem={props => <TimetableItem {...props} />}
                range={{
                  from: moment().weekday(0).toDate(),
                  till: getTimetableLastDate(schedule),
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

interface ItemProps {
  style: any;
  item: any;
}

const TimetableItem: React.FC<ItemProps> = ({style, item}) => {
  return (
    <View style={[style, styles.timetableItem]}>
      <Text style={[styles.classTypeText]}>{item.classType.id}</Text>
    </View>
  );
};

export default LecturerDetailsView;
