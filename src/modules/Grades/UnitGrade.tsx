import React from 'react';
import {ActivityIndicator, Text} from 'react-native-paper';
import {SafeAreaPadding, useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import {Dimensions, Pressable, ScrollView, View} from 'react-native';
import styles from './styles.ts';
import {TermCourseUnit} from '@modules/Grades/Model/TermGrades.ts';
import {default as FontAwesomeIcon} from 'react-native-vector-icons/FontAwesome6';
import {BarChart} from 'react-native-gifted-charts';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/pl';
import {useGetGradesDistributionQuery} from '@modules/Grades/api.ts';

interface Props {
  unit: TermCourseUnit;
  isOpened: boolean;
  open: (unitId: string) => void;
  close: () => void;
  courseName: string;
}

const UnitGrade: React.FC<Props> = ({
  unit,
  courseName,
  isOpened,
  open,
  close,
}) => {
  const theme = useAppTheme();
  const {t, i18n} = useTranslation();
  moment.updateLocale(i18n.resolvedLanguage ?? 'en', {week: {dow: 1}});

  const lastGrade =
    unit.grades.slice(-1).length > 0 ? unit.grades.slice(-1)[0] : null;

  const {data: gradesDistribution, isFetching: isFetchingGradesDistribution} =
    useGetGradesDistributionQuery(unit.grades[0]?.examId, {
      skip: !isOpened,
    });

  const getGradeBackgroudColor = (grade?: string): string => {
    if (grade) {
      const floatGrade = parseFloat(grade);

      if (floatGrade >= 4 || grade.toUpperCase() === 'ZAL') {
        return theme.colors.additional.green;
      }

      if (floatGrade >= 3) {
        return theme.colors.additional.yellow;
      }

      if (floatGrade >= 2) {
        return theme.colors.additional.red;
      }
    }

    return theme.colors.additional.red;
  };

  const gradesDistributionData = gradesDistribution?.map(d => {
    return {
      value: d.percentage,
      label: d.grade,
      frontColor:
        lastGrade?.grade === d.grade
          ? getGradeBackgroudColor(d.grade)
          : theme.colors.primary,
      topLabelComponent: () => (
        <Text style={{fontSize: 10}}>{`${d.percentage}%`}</Text>
      ),
    };
  });

  const myGradeIndexInDistribution = gradesDistributionData?.findIndex(
    d => d.label === lastGrade?.grade,
  );

  const toggleUnitGradeDetails = () => {
    if (unit.grades.length > 0) {
      !isOpened ? open(unit.id) : close();
    }
  };

  return (
    <View style={styles.unitGrade}>
      <Pressable onPress={() => toggleUnitGradeDetails()}>
        <View style={styles.unitGradeHeader}>
          <Text
            style={
              styles.courseName
            }>{`${courseName} - ${unit.type.name}`}</Text>
          <View style={{flex: 1}}>
            <View
              style={[
                lastGrade?.grade
                  ? styles.lastGrade
                  : styles.lastGradePlaceholder,
                lastGrade?.grade
                  ? {backgroundColor: getGradeBackgroudColor(lastGrade?.grade)}
                  : {backgroundColor: theme.colors.neutral['500']},
              ]}>
              <Text style={styles.lastGradeText}>
                {lastGrade?.grade.toUpperCase() ?? '-'}
              </Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            {lastGrade ? (
              <FontAwesomeIcon
                name={!isOpened ? 'chevron-down' : 'chevron-up'}
                solid
                size={16}
                color={theme.colors.primary}
              />
            ) : null}
          </View>
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
          <Text style={styles.gradesDistributionLabel}>
            {t('Grades distribution in your group') + ':'}
          </Text>
          {gradesDistributionData && !isFetchingGradesDistribution ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <BarChart
                isAnimated
                animationDuration={300}
                scrollToIndex={myGradeIndexInDistribution}
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
                disablePress={true}
                showScrollIndicator={false}
                minHeight={10}
                width={
                  Dimensions.get('screen').width - SafeAreaPadding * 2 - 24
                }
              />
            </ScrollView>
          ) : (
            <View style={styles.gradesDistributionLoader}>
              <ActivityIndicator size="small" color={theme.colors.primary} />
            </View>
          )}
        </View>
      ) : null}
    </View>
  );
};

export default UnitGrade;
