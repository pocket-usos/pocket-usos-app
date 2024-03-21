import {Dimensions, StyleSheet} from 'react-native';
import theme, {SafeAreaPadding, SafeAreaTopPadding} from '@styles/theme';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: theme.colors.background,
    paddingTop: SafeAreaTopPadding,
  },
  headerTitle: {
    color: theme.colors.neutral.black,
    paddingHorizontal: SafeAreaPadding,
    marginBottom: SafeAreaPadding,
  },
  termsContainer: {
    paddingHorizontal: SafeAreaPadding,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  term: {
    backgroundColor: theme.colors.primary,
    opacity: 0.5,
    borderRadius: 16,
  },
  selectedTerm: {
    backgroundColor: theme.colors.primary,
    opacity: 1,
  },
  termText: {
    color: theme.colors.neutral.white,
  },
  gradesContainer: {
    paddingHorizontal: SafeAreaPadding,
    marginTop: 24,
  },
  gradesContainerPlaceholder: {
    paddingHorizontal: SafeAreaPadding,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingBottom: 184,
  },
  noGradesPlaceholder: {
    fontSize: 18,
    color: theme.colors.neutral['700'],
    fontWeight: '500',
    textAlign: 'center',
  },
  courseName: {
    fontWeight: '600',
    flex: 8,
    fontSize: 12,
    lineHeight: 15,
  },
  unitGrade: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginBottom: 8,
  },
  unitGradeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  lastGradeText: {
    fontWeight: '600',
    fontSize: 12,
    color: theme.colors.neutral.white,
  },
  lastGrade: {
    width: 32,
    height: 32,
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  lastGradePlaceholder: {
    marginLeft: 'auto',
    marginRight: 24,
    width: 32,
    height: 32,
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  gradeDetails: {
    paddingTop: 16,
  },
  gradeDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  gradeDetailsLabel: {
    flex: 1,
    fontWeight: '600',
  },
  gradeDetailsValue: {
    flex: 1,
  },
  gradesDistributionLabel: {
    fontWeight: '600',
    marginTop: 16,
  },
  gradesDistributionLoader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 96,
  },
  gradesLoader: {
    paddingVertical: (Dimensions.get('screen').height - 300) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
