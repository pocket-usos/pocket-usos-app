import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Text} from 'react-native-paper';
import {SafeAreaPadding, useAppTheme} from '@styles/theme';
import {useTranslation} from 'react-i18next';
import {Dimensions, Pressable, ScrollView, View} from 'react-native';
import styles from './styles.ts';
import {
  SessionGrade,
  TermCourseUnit,
} from '@modules/Grades/Model/TermGrades.ts';
import {default as FontAwesomeIcon} from 'react-native-vector-icons/FontAwesome6';
import {BarChart} from 'react-native-gifted-charts';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/pl';
import {useGetGradesDistributionQuery} from '@modules/Grades/api.ts';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';

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

  const [currentGrade, setCurrentGrade] = useState<SessionGrade | null>(
    lastGrade,
  );

  const {data: gradesDistribution, isFetching: isFetchingGradesDistribution} =
    useGetGradesDistributionQuery(unit.grades[0]?.examId, {
      skip: !isOpened,
    });

  const getGradeBackgroudColor = (grade?: string): string => {
    if (grade) {
      const floatGrade = parseFloat(grade);

      if (floatGrade >= 4 || grade.toUpperCase() === 'ZAL') {
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

    setCurrentGrade(lastGrade);
    gradeDetailsCarousel.current?.scrollTo({
      index: unit.grades.findIndex(
        g => g.sessionNumber === currentGrade?.sessionNumber,
      ),
    });
  };

  const gradeDetailsCarousel = useRef<ICarouselInstance>(null);

  useEffect(() => {
    gradeDetailsCarousel.current?.scrollTo({
      index: unit.grades.findIndex(
        g => g.sessionNumber === currentGrade?.sessionNumber,
      ),
    });
  });

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
                currentGrade?.grade
                  ? styles.lastGrade
                  : styles.lastGradePlaceholder,
                currentGrade?.grade
                  ? {
                      backgroundColor: getGradeBackgroudColor(
                        currentGrade?.grade,
                      ),
                    }
                  : {backgroundColor: theme.colors.neutral['500']},
              ]}>
              <Text style={styles.lastGradeText}>
                {currentGrade?.grade.toUpperCase() ?? '-'}
              </Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            {currentGrade ? (
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
          {unit.grades.length > 1 ? (
            <View style={styles.gradeDetailsControls}>
              <Pressable
                style={styles.gradeDetailsControl}
                onPress={() => gradeDetailsCarousel.current?.prev()}>
                <FontAwesomeIcon
                  name={'chevron-left'}
                  solid
                  size={16}
                  color={theme.colors.primary}
                />
              </Pressable>
              <Text style={styles.gradeDetailsControlsLabel}>
                {t('Session') + ' Nr ' + currentGrade?.sessionNumber}
              </Text>
              <Pressable
                style={styles.gradeDetailsControl}
                onPress={() => gradeDetailsCarousel.current?.next()}>
                <FontAwesomeIcon
                  name={'chevron-right'}
                  solid
                  size={16}
                  color={theme.colors.primary}
                />
              </Pressable>
            </View>
          ) : null}
          {unit.grades.length > 1 ? (
            <Carousel
              ref={gradeDetailsCarousel}
              width={Dimensions.get('screen').width - 2 * SafeAreaPadding - 24}
              height={120}
              data={unit.grades}
              onSnapToItem={index => setCurrentGrade(unit.grades[index])}
              renderItem={({item}) => (
                <View style={{flex: 1}}>
                  <View style={styles.gradeDetailsRow}>
                    <Text style={styles.gradeDetailsLabel}>{t('Passes')}</Text>
                    <Text style={styles.gradeDetailsValue}>
                      {item?.passes ? t('Yes') : t('No')}
                    </Text>
                  </View>
                  <View style={styles.gradeDetailsRow}>
                    <Text style={styles.gradeDetailsLabel}>
                      {t('Counts into average')}
                    </Text>
                    <Text style={styles.gradeDetailsValue}>
                      {item?.countsIntoAverage ? t('Yes') : t('No')}
                    </Text>
                  </View>
                  <View style={styles.gradeDetailsRow}>
                    <Text style={styles.gradeDetailsLabel}>
                      {t('Given at')}
                    </Text>
                    <Text style={styles.gradeDetailsValue}>
                      {item?.modifiedAt
                        ? moment(item?.modifiedAt).format('YYYY-MM-DD HH:mm')
                        : '-'}
                    </Text>
                  </View>
                  <View style={styles.gradeDetailsRow}>
                    <Text style={styles.gradeDetailsLabel}>
                      {t('Given by')}
                    </Text>
                    <Text style={styles.gradeDetailsValue}>
                      {item?.modifiedBy
                        ? `${item.modifiedBy.firstName} ${item.modifiedBy.lastName}`
                        : '-'}
                    </Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <View>
              <View style={styles.gradeDetailsRow}>
                <Text style={styles.gradeDetailsLabel}>{t('Passes')}</Text>
                <Text style={styles.gradeDetailsValue}>
                  {currentGrade?.passes ? t('Yes') : t('No')}
                </Text>
              </View>
              <View style={styles.gradeDetailsRow}>
                <Text style={styles.gradeDetailsLabel}>
                  {t('Counts into average')}
                </Text>
                <Text style={styles.gradeDetailsValue}>
                  {currentGrade?.countsIntoAverage ? t('Yes') : t('No')}
                </Text>
              </View>
              <View style={styles.gradeDetailsRow}>
                <Text style={styles.gradeDetailsLabel}>{t('Given at')}</Text>
                <Text style={styles.gradeDetailsValue}>
                  {currentGrade?.modifiedAt
                    ? moment(currentGrade?.modifiedAt).format(
                        'YYYY-MM-DD HH:mm',
                      )
                    : '-'}
                </Text>
              </View>
              <View style={styles.gradeDetailsRow}>
                <Text style={styles.gradeDetailsLabel}>{t('Given by')}</Text>
                <Text style={styles.gradeDetailsValue}>
                  {currentGrade?.modifiedBy
                    ? `${currentGrade.modifiedBy.firstName} ${currentGrade.modifiedBy.lastName}`
                    : '-'}
                </Text>
              </View>
            </View>
          )}
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
