import React, {useRef} from 'react';
import {ActivityIndicator, Chip, ProgressBar, Text} from 'react-native-paper';
import {useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import Term from '@modules/Grades/Model/Term';
import {Image, Pressable, ScrollView, View} from 'react-native';
import moment from 'moment';
import styles from './styles';
import Course from '@modules/Courses/Model/Course.ts';
import {useNavigation} from '@react-navigation/native';

interface Props {
  terms: Term[];
  selectedTerm?: Term;
  onTermSelect: (term: Term) => void;
  isFetchingCourses: boolean;
  courses?: Course[];
  coursesWithSchedule?: Course[];
  isFetchingSchedules: boolean;
  lecturersPhotos?: {[id: string]: string};
  areLecturersPhotosFetching: boolean;
}

const CoursesView: React.FC<Props> = ({
  terms,
  selectedTerm,
  onTermSelect,
  isFetchingCourses,
  courses,
  coursesWithSchedule,
  isFetchingSchedules,
  lecturersPhotos,
  areLecturersPhotosFetching,
}) => {
  const theme = useAppTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const goToCourseScreen = (course: Course, color: string) => {
    if (!isFetchingSchedules) {
      const courseWithSchedule = coursesWithSchedule?.find(
        c => c.unitId === course.unitId && c.groupNumber === course.groupNumber,
      );

      if (courseWithSchedule) {
        navigation.navigate('SingleCourse', {
          course: courseWithSchedule,
          color: color,
          previousScreen: 'Courses',
        });
      }
    }
  };

  const getCourseProgressValue = (course: Course) => {
    const schedule = coursesWithSchedule?.find(
      c => c.unitId === course.unitId && c.groupNumber === course.groupNumber,
    )?.schedule;

    if (schedule) {
      const count = schedule.classesCount;
      const completed = schedule.classesCompleted;
      const courseTerm = terms.find(term => term.id === course.term);

      if (count === 0) {
        return moment(courseTerm?.endDate).isBefore(moment()) ? 1 : 0;
      }

      return completed / count;
    }

    return 0;
  };

  const getCourseProgressResultText = (course: Course) => {
    const courseProgress = getCourseProgressValue(course);

    if (coursesWithSchedule === undefined || isFetchingSchedules) {
      return t('Loading');
    } else if (courseProgress === 1) {
      return t('Completed');
    } else if (courseProgress === 0) {
      return t('Not started');
    } else {
      const schedule = coursesWithSchedule?.find(
        c => c.unitId === course.unitId && c.groupNumber === course.groupNumber,
      )?.schedule;

      return `${schedule.classesCompleted} / ${schedule.classesCount}`;
    }
  };

  const getCourseBackgroudColor = (courseIndex: number) => {
    const colors = [
      theme.colors.secondary,
      theme.colors.additional.red,
      theme.colors.primary,
    ];

    return colors[courseIndex % colors.length];
  };

  const scrollViewRef = useRef<ScrollView>();
  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  return (
    <View style={styles.container}>
      <View>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          {t('Your courses')}
        </Text>
        <ScrollView
          horizontal
          style={styles.terms}
          showsHorizontalScrollIndicator={false}>
          {terms.map(term => (
            <Chip
              key={term.id}
              style={[
                styles.term,
                term.id === selectedTerm?.id ? styles.selectedTerm : null,
              ]}
              textStyle={styles.termText}
              selected={term.id === selectedTerm?.id}
              selectedColor={theme.colors.neutral.white}
              onPress={() => {
                onTermSelect(term);
                scrollToTop();
              }}>
              {term.name}
            </Chip>
          ))}
        </ScrollView>
      </View>
      {isFetchingCourses ? (
        <View style={styles.coursesLoader}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <ScrollView
          ref={scrollViewRef}
          horizontal={false}
          style={styles.coursesContainer}>
          {courses?.map((course, index) => (
            <Pressable
              key={course.unitId}
              onPress={() =>
                goToCourseScreen(course, getCourseBackgroudColor(index))
              }>
              <View
                style={[
                  styles.course,
                  {backgroundColor: getCourseBackgroudColor(index)},
                ]}>
                <Text variant="titleMedium" style={styles.courseTitle}>
                  {course.name}
                </Text>
                <Text style={styles.groupNumber}>{`${t('Group')} #${
                  course.groupNumber
                }`}</Text>
                <View style={styles.courseProgress}>
                  <Text style={styles.courseProgressLabel}>
                    {`${t('Course progress')} - ${getCourseProgressResultText(
                      course,
                    )}`}
                  </Text>
                  <ProgressBar
                    indeterminate={isFetchingSchedules}
                    progress={getCourseProgressValue(course)}
                    style={styles.courseProgressBar}
                    fillStyle={styles.courseProgressBarFilled}
                  />
                </View>
                <View style={styles.courseAttribute}>
                  <View style={styles.courseAttributeIcon}>
                    {areLecturersPhotosFetching ||
                    lecturersPhotos === undefined ? (
                      <Image
                        source={require('../../../assets/images/user-avatar-blank.png')}
                        style={styles.lecturersPhoto}
                      />
                    ) : (
                      <Image
                        source={{uri: lecturersPhotos[course.lecturers[0].id]}}
                        style={styles.lecturersPhoto}
                      />
                    )}
                  </View>
                  <Text style={styles.courseAttributeText}>
                    {`${course.lecturers[0].firstName} ${course.lecturers[0].lastName}`}
                  </Text>
                </View>
                <View style={styles.classTypeContainer}>
                  <Text style={styles.classTypeText}>
                    {course.classType.id}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
export default CoursesView;
