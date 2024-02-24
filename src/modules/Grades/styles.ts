import {StyleSheet} from 'react-native';
import theme from '@styles/theme';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    color: theme.colors.neutral.black,
    paddingHorizontal: 36,
    marginBottom: 36,
  },
  terms: {
    paddingLeft: 36,
  },
  term: {
    marginRight: 12,
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
    paddingHorizontal: 36,
    marginTop: 12,
  },
  courseContainer: {},
  courseName: {
    marginVertical: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  unitType: {
    fontWeight: '600',
    maxWidth: '70%',
    fontSize: 12,
    lineHeight: 15,
  },
  unitGrade: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginBottom: 8,
  },
  unitGradeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastGradeText: {
    fontWeight: '600',
    fontSize: 12,
    color: theme.colors.neutral.white,
  },
  lastGrade: {
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
});

export default styles;
