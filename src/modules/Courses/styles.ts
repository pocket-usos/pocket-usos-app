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
  coursesContainer: {
    marginTop: 24,
  },
  singleCourseContainer: {
    paddingHorizontal: SafeAreaPadding,
  },
  course: {
    padding: 24,
    marginVertical: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 32,
  },
  courseTitle: {
    color: theme.colors.neutral.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  groupNumber: {
    color: '#F5F5F5',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 16,
  },
  courseProgress: {
    marginBottom: 24,
  },
  courseProgressLabel: {
    color: theme.colors.neutral.white,
    fontWeight: '500',
    marginBottom: 8,
  },
  courseProgressBar: {
    height: 8,
    borderRadius: 4,
  },
  courseProgressBarFilled: {
    backgroundColor: theme.colors.semantic.success,
  },
  courseAttribute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  courseAttributeIcon: {
    marginRight: 8,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7EBF7',
    borderRadius: 36,
  },
  lecturersPhoto: {
    width: 36,
    height: 36,
    borderRadius: 36,
  },
  courseAttributeText: {
    color: theme.colors.neutral.white,
    fontSize: 14,
    maxWidth: '80%',
  },
  classTypeContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomRightRadius: 32,
    borderTopLeftRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classTypeText: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.neutral.black,
  },
  coursesLoader: {
    paddingVertical: (Dimensions.get('screen').height - 300) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseGroupPagination: {
    position: 'absolute',
    bottom: -4,
    left: 0,
    width: '100%',
  },
  courseGroupPaginationDotContainer: {
    width: 0,
  },
  courseGroupPaginationDot: {
    backgroundColor: theme.colors.neutral.white,
    width: 6,
    height: 6,
  },
  courseGroupPaginationInactiveDot: {
    backgroundColor: theme.colors.neutral.white,
    width: 6,
    height: 6,
  },
});

export default styles;
