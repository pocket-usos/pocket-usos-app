import React from 'react';
import {ProgressBar, Text} from 'react-native-paper';
import {useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import Term from '@modules/Grades/Model/Term';
import {Image, Pressable, View} from 'react-native';
import moment from 'moment';
import styles from './styles';
import Course from '@modules/Courses/Model/Course.ts';

interface Props {
  course: Course;
  goToCourseScreen: (course: Course, color: string) => void;
  index: number;
  terms: Term[];
  coursesWithSchedule?: Course[];
  isFetchingSchedules: boolean;
  lecturersPhotos?: {[id: string]: string};
  areLecturersPhotosFetching: boolean;
}

const CourseItem: React.FC<Props> = ({
  course,
  goToCourseScreen,
  index,
  terms,
  coursesWithSchedule,
  isFetchingSchedules,
  lecturersPhotos,
  areLecturersPhotosFetching,
}) => {
  const theme = useAppTheme();
  const {t} = useTranslation();

  const getProgressValue = (): number => {
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

  const getProgressResultText = (): string => {
    const courseProgress = getProgressValue();

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

      return `${schedule!.classesCompleted} / ${schedule!.classesCount}`;
    }
  };

  const getBackgroudColor = (): string => {
    const colors = [
      theme.colors.secondary,
      theme.colors.semantic.error,
      theme.colors.primary,
    ];

    return colors[index % colors.length];
  };

  return (
    <Pressable
      key={course.unitId}
      onPress={() => goToCourseScreen(course, getBackgroudColor())}>
      <View style={[styles.course, {backgroundColor: getBackgroudColor()}]}>
        <Text variant="titleMedium" style={styles.courseTitle}>
          {course.name}
        </Text>
        <Text style={styles.groupNumber}>{`${t('Group')} #${
          course.groupNumber
        }`}</Text>
        <View style={styles.courseProgress}>
          <Text style={styles.courseProgressLabel}>
            {`${t('Course progress')} - ${getProgressResultText()}`}
          </Text>
          <ProgressBar
            indeterminate={isFetchingSchedules}
            progress={getProgressValue()}
            style={styles.courseProgressBar}
            fillStyle={styles.courseProgressBarFilled}
          />
        </View>
        {course.lecturers.length > 0 ? (
          <View style={styles.courseAttribute}>
            <View style={styles.courseAttributeIcon}>
              {areLecturersPhotosFetching || lecturersPhotos === undefined ? (
                <Image
                  source={require('../../../assets/images/user-avatar-blank.png')}
                  style={styles.lecturersPhoto}
                />
              ) : (
                <Image
                  source={{
                    uri: lecturersPhotos[course.lecturers[0].id],
                  }}
                  style={styles.lecturersPhoto}
                />
              )}
            </View>
            <Text style={styles.courseAttributeText}>
              {`${course.lecturers[0].firstName} ${course.lecturers[0].lastName}`}
            </Text>
          </View>
        ) : (
          <View style={{paddingVertical: 12}} />
        )}
        <View style={styles.classTypeContainer}>
          <Text style={styles.classTypeText}>{course.classType.id}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CourseItem;
