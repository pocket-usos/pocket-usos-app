import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Chip, Text} from 'react-native-paper';
import {useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import {RefreshControl, ScrollView, View} from 'react-native';
import styles from './styles.ts';
import Term from './Model/Term.ts';
import TermGrades from '@modules/Grades/Model/TermGrades.ts';
import UnitGrade from './UnitGrade.tsx';

interface Props {
  terms: Term[];
  selectedTerm?: Term;
  onTermSelect: (term: Term) => void;
  isFetchingGrades: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  grades?: TermGrades;
}

const GradesView: React.FC<Props> = ({
  terms,
  selectedTerm,
  onTermSelect,
  isFetchingGrades,
  isRefreshing,
  onRefresh,
  grades,
}) => {
  const theme = useAppTheme();
  const {t} = useTranslation();

  const availableCourseGrades = grades?.courses.filter(
    courseGrades =>
      courseGrades.units.find(unit => unit.grades.length > 0) !== undefined,
  );

  const nonAvailableCourseGrades = grades?.courses.filter(
    courseGrades =>
      courseGrades.units.find(unit => unit.grades.length > 0) === undefined,
  );

  const [openedGrade, setOpenedGrade] = useState<string>();

  const termsScrollView = useRef<ScrollView>();
  const gradesScrollView = useRef<ScrollView>();

  const openGrade = (unitId: string, index: number) => {
    setOpenedGrade(unitId);
    gradesScrollView.current?.scrollTo({x: 0, y: index * 65, animated: true});
  };

  const closeGrade = () => setOpenedGrade(undefined);

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

  const getGradeBackgroudColor = (grade?: number): string => {
    if (grade === undefined || grade === 0 || grade === null) {
      return theme.colors.neutral['500'];
    }

    if (grade >= 4) {
      return theme.colors.semantic.success;
    }

    if (grade >= 3) {
      return theme.colors.semantic.warning;
    }

    if (grade >= 2) {
      return theme.colors.semantic.error;
    }

    return theme.colors.semantic.error;
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.headerTitle}>
            {t('Your grades')}
          </Text>
          <View
            style={[
              styles.averageGradeContainer,
              {backgroundColor: getGradeBackgroudColor(grades?.averageGrade)},
            ]}>
            <Text style={styles.averageGradeLabel}>{t('AVG')}</Text>
            <View style={styles.averageGradeValueContainer}>
              <Text style={styles.averageGradeValue}>
                {grades?.averageGrade && grades?.averageGrade !== 0
                  ? grades.averageGrade
                  : '-'}
              </Text>
            </View>
          </View>
        </View>
        <ScrollView
          ref={termsScrollView}
          horizontal
          persistentScrollbar
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
                onPress={() => onTermSelect(term)}>
                {term.name}
              </Chip>
            ))}
          </View>
        </ScrollView>
      </View>
      {isFetchingGrades ? (
        <View style={styles.gradesLoader}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <View>
          {availableCourseGrades?.length === 0 &&
          nonAvailableCourseGrades?.length === 0 ? (
            <View style={styles.gradesContainerPlaceholder}>
              <Text style={styles.noGradesPlaceholder}>
                {t("You don't have any grades on this term") + '.'}
              </Text>
            </View>
          ) : (
            <ScrollView
              ref={gradesScrollView}
              horizontal={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                />
              }
              style={styles.gradesContainer}>
              <View style={styles.gradesInnerContainer}>
                {availableCourseGrades?.map((course, index) => (
                  <View key={course.id}>
                    {course.units.map(unit => (
                      <UnitGrade
                        key={unit.id}
                        unit={unit}
                        courseName={course.name}
                        isOpened={openedGrade === unit.id}
                        open={(unitId: string) => openGrade(unitId, index)}
                        close={closeGrade}
                      />
                    ))}
                  </View>
                ))}
                {nonAvailableCourseGrades?.map((course, index) => (
                  <View key={course.id}>
                    {course.units.map(unit => (
                      <UnitGrade
                        key={unit.id}
                        unit={unit}
                        courseName={course.name}
                        isOpened={openedGrade === unit.id}
                        open={(unitId: string) =>
                          openGrade(
                            unitId,
                            index + (availableCourseGrades?.length ?? 0),
                          )
                        }
                        close={closeGrade}
                      />
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};

export default GradesView;
