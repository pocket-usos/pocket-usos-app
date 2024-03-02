import React, {useEffect, useRef} from 'react';
import {ProgressBar, Text} from 'react-native-paper';
import {useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import {Image, Linking, Pressable, ScrollView, View} from 'react-native';
import styles from './styles';
import Course from '@modules/Courses/Model/Course.ts';
import {default as FontAwesomeIcon} from 'react-native-vector-icons/FontAwesome6';
import moment from 'moment';
import Term from '@modules/Grades/Model/Term.ts';
import User from '@modules/Users/Model/User.ts';
import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import {useIsFocused} from '@react-navigation/native';

interface Props {
  course: Course;
  terms?: Term[];
  mainColor: string;
  usersPhotos?: {[id: string]: string};
  lecturers?: User[];
  goBack: () => void;
}

const SingleCourseView: React.FC<Props> = ({
  course,
  terms,
  mainColor,
  usersPhotos,
  lecturers,
  goBack,
}) => {
  const theme = useAppTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const isFocused = useIsFocused();
  const scrollViewRef = useRef<ScrollView>();

  useEffect(() => {
    if (isFocused) {
      scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: false});
    }
  }, [isFocused]);

  const getCourseProgressValue = (course: Course) => {
    const count = course.schedule.classesCount;
    const completed = course.schedule.classesCompleted;
    const courseTerm = terms?.find(term => term.id === course.term);

    if (courseTerm === undefined) {
      return 0;
    }

    if (count === 0) {
      return moment(courseTerm?.endDate).isBefore(moment()) ? 1 : 0;
    }

    return completed / count;
  };

  const getCourseProgressResultText = (course: Course) => {
    const courseProgress = getCourseProgressValue(course);

    if (courseProgress === 1) {
      return t('Completed');
    } else if (courseProgress === 0) {
      return t('Not started');
    } else {
      return `${course.schedule.classesCompleted} / ${course.schedule.classesCount}`;
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        sharedTransitionTag={`course-${course.unitId}`}
        style={[styles.header, {backgroundColor: mainColor}]}>
        <Pressable onPress={goBack} style={styles.backButton}>
          <FontAwesomeIcon
            name="chevron-left"
            solid
            size={16}
            color={theme.colors.neutral.white}
          />
          <Text style={styles.backButtonText}>{t('Back')}</Text>
        </Pressable>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          {course.name}
        </Text>
        <View style={styles.courseTags}>
          <View style={styles.courseTag}>
            <Text style={styles.courseTagText}>{course.classType.name}</Text>
          </View>
          <View style={styles.courseTag}>
            <Text style={styles.courseTagText}>{`${t('Group')} #${
              course.groupNumber
            }`}</Text>
          </View>
        </View>
        <View style={styles.courseProgress}>
          <Text style={styles.courseProgressLabel}>
            {`${t('Course progress')} - ${getCourseProgressResultText(course)}`}
          </Text>
          <ProgressBar
            progress={getCourseProgressValue(course)}
            style={styles.courseProgressBar}
            fillStyle={styles.courseProgressBarFilled}
          />
        </View>
      </Animated.View>
      <ScrollView
        ref={scrollViewRef}
        scrollsToTop={true}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={styles.courseDetails}>
        <View style={styles.courseDetailsItem}>
          <Text style={styles.courseDetailsLabel}>{t('Lecturers')}</Text>
          {course.lecturers.map(lecturer => (
            <View key={lecturer.id} style={styles.lecturer}>
              {usersPhotos === undefined ? (
                <Image
                  source={require('../../../../assets/images/user-avatar-blank.png')}
                  style={styles.userPhoto}
                />
              ) : (
                <Image
                  source={{uri: usersPhotos[lecturer.id]}}
                  style={styles.userPhoto}
                />
              )}
              <View style={styles.lecturerDetails}>
                <Text style={styles.lecturerName}>
                  {`${
                    lecturers?.find(l => l.id === lecturer.id)?.title ?? ''
                  } ${lecturer.firstName} ${lecturer.lastName}`.trim()}
                </Text>
                <Text style={styles.lecturerEmail}>
                  {lecturers?.find(l => l.id === lecturer.id)?.email ?? 'Email'}
                </Text>
              </View>
              <Pressable
                style={styles.sendEmailButton}
                onPress={async () =>
                  await Linking.openURL(
                    `mailto:${
                      lecturers?.find(l => l.id === lecturer.id)?.email ?? ''
                    }`,
                  )
                }>
                <FontAwesomeIcon
                  name="envelope"
                  size={24}
                  color={theme.colors.neutral['700']}
                />
              </Pressable>
            </View>
          ))}
        </View>
        <View style={styles.courseDetailsItem}>
          <Text style={styles.courseDetailsLabel}>{`${t('Your group')} - ${
            course.participants?.length
          } ${t('people')}`}</Text>
          {course.participants?.map(participant => (
            <View key={participant.id} style={styles.participant}>
              {usersPhotos === undefined ? (
                <Image
                  source={require('../../../../assets/images/user-avatar-blank.png')}
                  style={styles.userPhoto}
                />
              ) : (
                <Image
                  source={{uri: usersPhotos[participant.id]}}
                  style={styles.userPhoto}
                />
              )}
              <Text
                style={
                  styles.participantName
                }>{`${participant.firstName} ${participant.lastName}`}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default SingleCourseView;
