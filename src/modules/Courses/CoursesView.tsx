import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Chip, Text} from 'react-native-paper';
import {SafeAreaPadding, useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import Term from '@modules/Grades/Model/Term';
import {Dimensions, RefreshControl, ScrollView, View} from 'react-native';
import styles from './styles';
import Course from '@modules/Courses/Model/Course.ts';
import {useNavigation} from '@react-navigation/native';
import CourseItem from './CourseItem';
import Carousel, {Pagination} from 'react-native-snap-carousel';

interface Props {
  terms: Term[];
  selectedTerm?: Term;
  onTermSelect: (term: Term) => void;
  isFetchingCourses: boolean;
  courses?: Course[][];
  coursesWithSchedule?: Course[];
  isFetchingSchedules: boolean;
  lecturersPhotos?: {[id: string]: string};
  areLecturersPhotosFetching: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
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
  isRefreshing,
  onRefresh,
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

  const termsScrollView = useRef<ScrollView>();
  const scrollViewRef = useRef<ScrollView>();
  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  useEffect(() => {
    const coordinates: {[termId: string]: number} = {};
    coordinates[terms[0].id] = 0;
    terms.forEach((term, index) => {
      if (index > 0) {
        coordinates[term.id] =
          coordinates[terms[index - 1].id] + term.name.length * 9;
      }
    });

    if (selectedTerm) {
      termsScrollView.current?.scrollTo({
        x: coordinates[selectedTerm?.id],
        y: 0,
        animated: true,
      });
    }
  }, [terms, selectedTerm, termsScrollView]);

  const [activeSlides, setActiveSlides] = useState<{
    [courseId: string]: number;
  }>({});

  const getActiveSlide = (courseId: string) => activeSlides[courseId] ?? 0;
  const setActiveSlide = (courseId: string, activeSlide: number) => {
    const newActiveSlides = {...activeSlides};
    newActiveSlides[courseId] = activeSlide;
    setActiveSlides(newActiveSlides);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          {t('Your courses')}
        </Text>
        <ScrollView
          ref={termsScrollView}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <View style={styles.termsContainer}>
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
          </View>
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
          style={styles.coursesContainer}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }>
          {courses?.map((courseGroup, index) => (
            <View key={index}>
              {courseGroup.length === 1 ? (
                <View style={styles.singleCourseContainer}>
                  <CourseItem
                    course={courseGroup[0]}
                    goToCourseScreen={goToCourseScreen}
                    index={index}
                    terms={terms}
                    coursesWithSchedule={coursesWithSchedule}
                    isFetchingSchedules={isFetchingSchedules}
                    lecturersPhotos={lecturersPhotos}
                    areLecturersPhotosFetching={areLecturersPhotosFetching}
                  />
                </View>
              ) : (
                <View>
                  <Carousel
                    loop={false}
                    sliderWidth={Dimensions.get('screen').width}
                    itemWidth={
                      Dimensions.get('screen').width - SafeAreaPadding * 2
                    }
                    lockScrollWhileSnapping
                    inactiveSlideScale={0.95}
                    inactiveSlideOpacity={0.8}
                    data={courseGroup}
                    onSnapToItem={index =>
                      setActiveSlide(courseGroup[0].id, index)
                    }
                    renderItem={({item}) => (
                      <CourseItem
                        course={item}
                        goToCourseScreen={goToCourseScreen}
                        index={index}
                        terms={terms}
                        coursesWithSchedule={coursesWithSchedule}
                        isFetchingSchedules={isFetchingSchedules}
                        lecturersPhotos={lecturersPhotos}
                        areLecturersPhotosFetching={areLecturersPhotosFetching}
                      />
                    )}
                  />
                  <Pagination
                    dotsLength={courseGroup.length}
                    activeDotIndex={getActiveSlide(courseGroup[0].id)}
                    containerStyle={styles.courseGroupPagination}
                    dotContainerStyle={styles.courseGroupPaginationDotContainer}
                    dotStyle={styles.courseGroupPaginationDot}
                    inactiveDotStyle={styles.courseGroupPaginationInactiveDot}
                    inactiveDotScale={1}
                  />
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CoursesView;
