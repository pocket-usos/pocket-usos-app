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
    marginBottom: 36,
  },
  terms: {
    paddingHorizontal: SafeAreaPadding,
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
  coursesContainer: {
    paddingHorizontal: SafeAreaPadding,
    marginTop: 24,
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
    backgroundColor: theme.colors.additional.green,
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
});

export default styles;
