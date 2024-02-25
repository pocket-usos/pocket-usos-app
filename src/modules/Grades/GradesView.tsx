import React from 'react';
import {Chip, Text} from 'react-native-paper';
import {useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import styles from './styles.ts';
import Term from './Model/Term.ts';
import TermGrades from '@modules/Grades/Model/TermGrades.ts';
import UnitGrade from './UnitGrade.tsx';

interface Props {
  terms: Term[];
  selectedTerm?: Term;
  onTermSelect: (term: Term) => void;
  grades?: TermGrades;
}

const GradesView: React.FC<Props> = ({
  terms,
  selectedTerm,
  onTermSelect,
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

  return (
    <View style={styles.container}>
      <View>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          {t('Your grades')}
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
              onPress={() => onTermSelect(term)}>
              {term.name}
            </Chip>
          ))}
        </ScrollView>
      </View>
      {availableCourseGrades?.length === 0 &&
      nonAvailableCourseGrades?.length === 0 ? (
        <View style={styles.gradesContainerPlaceholder}>
          <Text style={styles.noGradesPlaceholder}>
            {t("You don't have any grades on this term") + '.'}
          </Text>
        </View>
      ) : (
        <ScrollView horizontal={false} style={styles.gradesContainer}>
          {availableCourseGrades?.map(course => (
            <View key={course.id}>
              {course.units.map(unit => (
                <UnitGrade key={unit.id} unit={unit} courseName={course.name} />
              ))}
            </View>
          ))}
          {nonAvailableCourseGrades?.map(course => (
            <View key={course.id}>
              {course.units.map(unit => (
                <UnitGrade key={unit.id} unit={unit} courseName={course.name} />
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default GradesView;
