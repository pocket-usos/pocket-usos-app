import {StyleSheet} from 'react-native';
import theme, {SafeAreaPadding, SafeAreaTopPadding} from '@styles/theme';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: SafeAreaTopPadding,
    paddingHorizontal: SafeAreaPadding,
    paddingBottom: 36,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  lecturerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  lecturerTitle: {
    color: theme.colors.neutral.white,
    fontSize: 18,
    fontWeight: '600',
  },
  lecturerPhoto: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 8,
  },
  lecturerEmail: {
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.neutral.white,
    letterSpacing: 1.1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButtonText: {
    color: theme.colors.neutral.white,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  sendEmailButton: {
    borderRadius: 15,
    borderColor: theme.colors.neutral.white,
    marginTop: 16,
  },
  sendEmailButtonLabel: {
    color: theme.colors.neutral.white,
  },
  lecturerAttribute: {
    marginTop: 36,
  },
  lecturerAttributeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  seeAllButton: {
    marginLeft: 'auto',
    color: theme.colors.primary,
  },
  lecturerAttribureLabel: {
    color: theme.colors.neutral.black,
    fontSize: 14,
    fontWeight: '600',
  },
  linkText: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
  consultationText: {
    fontSize: 13,
    lineHeight: 20,
    textAlignVertical: 'center',
  },
  conductedCourse: {
    color: theme.colors.neutral.black,
    marginBottom: 8,
  },
  conductedCourseId: {
    fontSize: 10,
    color: theme.colors.neutral['700'],
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  lecturerTimetable: {
    paddingBottom: 36,
  },
  timetableItem: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timetableLines: {
    borderTopColor: theme.colors.neutral['500'],
    borderBottomColor: theme.colors.neutral['500'],
    borderColor: theme.colors.neutral['300'],
  },
  timetableHeaderText: {
    fontSize: 12,
  },
  timetableTimeText: {
    fontSize: 12,
  },
  classTypeText: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.neutral.white,
  },
});
export default styles;
