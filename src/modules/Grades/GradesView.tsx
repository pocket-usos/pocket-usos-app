import React, {useState} from 'react';
import {Chip, Text} from 'react-native-paper';
import {useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import {Pressable, ScrollView, View} from 'react-native';
import styles from './styles.ts';
import Term from './Model/Term.ts';
import TermGrades, {TermCourseUnit} from '@modules/Grades/Model/TermGrades.ts';
import {default as FontAwesomeIcon} from 'react-native-vector-icons/FontAwesome6';
import {BarChart} from 'react-native-gifted-charts';
import moment from 'moment';

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
      <ScrollView horizontal={false} style={styles.gradesContainer}>
        {availableCourseGrades?.map(course => (
          <View key={course.id} style={styles.courseContainer}>
            {/*<Text style={styles.courseName}>{course.name}</Text>*/}
            {course.units.map(unit => (
              <UnitGrade key={unit.id} unit={unit} courseName={course.name} />
            ))}
          </View>
        ))}
        {nonAvailableCourseGrades?.map(course => (
          <View key={course.id} style={styles.courseContainer}>
            {/*<Text style={styles.courseName}>{course.name}</Text>*/}
            {course.units.map(unit => (
              <UnitGrade key={unit.id} unit={unit} courseName={course.name} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

interface UnitGradeProps {
  unit: TermCourseUnit;
  courseName: string;
}

const UnitGrade: React.FC<UnitGradeProps> = ({unit, courseName}) => {
  const theme = useAppTheme();
  const {t} = useTranslation();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const lastGrade =
    unit.grades.slice(-1).length > 0 ? unit.grades.slice(-1)[0] : null;

  const gradesDistributionData = unit.gradesDistribution?.map(d => {
    return {
      value: d.percentage,
      label: d.grade,
      topLabelComponent: () => (
        <Text style={{fontSize: 10}}>{`${d.percentage}%`}</Text>
      ),
    };
  });

  const getGradeBackgroudColor = (grade?: string): string => {
    if (grade) {
      const floatGrade = parseFloat(grade);

      if (floatGrade >= 4 || grade === 'ZAL') {
        return theme.colors.semantic.success;
      }

      if (floatGrade >= 3) {
        return theme.colors.semantic.warning;
      }

      if (floatGrade >= 2) {
        return theme.colors.semantic.error;
      }
    }

    return theme.colors.semantic.error;
  };

  return (
    <View style={styles.unitGrade}>
      <Pressable onPress={() => setIsOpened(!isOpened)}>
        <View style={styles.unitGradeHeader}>
          {/*<Text style={styles.unitType}>{unit.type.name}</Text>*/}
          <Text style={styles.unitType}>{courseName}</Text>
          <View
            style={[
              lastGrade?.grade ? styles.lastGrade : styles.lastGradePlaceholder,
              lastGrade?.grade
                ? {backgroundColor: getGradeBackgroudColor(lastGrade?.grade)}
                : {backgroundColor: theme.colors.neutral['700']},
            ]}>
            <Text style={styles.lastGradeText}>{lastGrade?.grade ?? '-'}</Text>
          </View>
          {lastGrade ? (
            <FontAwesomeIcon
              name={!isOpened ? 'chevron-down' : 'chevron-up'}
              solid
              size={16}
              color={theme.colors.primary}
            />
          ) : null}
        </View>
      </Pressable>
      {isOpened ? (
        <View style={styles.gradeDetails}>
          <View style={styles.gradeDetailsRow}>
            <Text style={styles.gradeDetailsLabel}>{t('Passes')}</Text>
            <Text style={styles.gradeDetailsValue}>
              {lastGrade?.passes ? t('Yes') : t('No')}
            </Text>
          </View>
          <View style={styles.gradeDetailsRow}>
            <Text style={styles.gradeDetailsLabel}>
              {t('Counts into average')}
            </Text>
            <Text style={styles.gradeDetailsValue}>
              {lastGrade?.countsIntoAverage ? t('Yes') : t('No')}
            </Text>
          </View>
          <View style={styles.gradeDetailsRow}>
            <Text style={styles.gradeDetailsLabel}>{t('Given at')}</Text>
            <Text style={styles.gradeDetailsValue}>
              {moment(lastGrade?.modifiedAt).format('YYYY-MM-DD HH:mm')}
            </Text>
          </View>
          <View style={styles.gradeDetailsRow}>
            <Text style={styles.gradeDetailsLabel}>{t('Given by')}</Text>
            <Text style={styles.gradeDetailsValue}>
              {`${lastGrade?.modifiedBy.firstName} ${lastGrade?.modifiedBy.lastName}`}
            </Text>
          </View>
          {gradesDistributionData ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{flexDirection: 'row', marginTop: 16}}>
              <BarChart
                data={gradesDistributionData}
                barWidth={20}
                barStyle={{marginTop: 4}}
                maxValue={
                  Math.max(...gradesDistributionData.map(d => d.value)) + 5
                }
                hideYAxisText={true}
                barBorderRadius={4}
                frontColor={theme.colors.primary}
                yAxisThickness={0}
                yAxisExtraHeight={16}
                xAxisThickness={0}
                noOfSections={4}
                disableScroll={true}
                disablePress={true}
                minHeight={10}
              />
            </ScrollView>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default GradesView;
