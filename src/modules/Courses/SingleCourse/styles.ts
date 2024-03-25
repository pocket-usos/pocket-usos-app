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
  headerTitle: {
    color: theme.colors.neutral.white,
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
  courseTags: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 8,
  },
  courseTag: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.neutral.white,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  courseTagText: {
    color: theme.colors.neutral.black,
    fontWeight: '600',
    fontSize: 12,
  },
  courseProgress: {
    marginTop: 24,
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
  courseDetails: {
    paddingHorizontal: SafeAreaPadding,
  },
  courseDetailsContainer: {
    paddingTop: 36,
  },
  courseDetailsItem: {
    paddingBottom: 24,
  },
  courseDetailsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.neutral.black,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: theme.colors.neutral['300'],
  },
  lecturer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  lecturerDetails: {
    marginLeft: 16,
  },
  lecturerName: {
    fontSize: 14,
    color: theme.colors.neutral.black,
    fontWeight: '500',
    marginBottom: 4,
    maxWidth: '90%',
  },
  lecturerEmail: {
    fontSize: 12,
    color: theme.colors.neutral['700'],
  },
  sendEmailButton: {
    marginLeft: 'auto',
  },
  participant: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  participantName: {
    fontSize: 14,
    color: theme.colors.neutral.black,
    fontWeight: '500',
    marginLeft: 16,
  },
});
export default styles;
