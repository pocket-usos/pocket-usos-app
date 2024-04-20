import {StyleSheet} from 'react-native';
import theme, {SafeAreaPadding} from '@styles/theme';

const styles = StyleSheet.create({
  profilePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral.white,
    paddingBottom: 16,
  },
  studentNumber: {
    color: theme.colors.neutral['700'],
    fontSize: 13,
    letterSpacing: 1,
    paddingBottom: 4,
  },
  profilePreviewPhoto: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 12,
  },
  notificationsButton: {
    marginLeft: 'auto',
  },
  notificationsBadge: {
    backgroundColor: theme.colors.semantic.error,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  menuButton: {
    marginLeft: 12,
  },
  menuButtonIcon: {
    width: 28,
    height: 28,
  },
  bottomDrawer: {
    padding: SafeAreaPadding,
    paddingTop: 0,
  },
  signOutButton: {
    borderRadius: 20,
    borderColor: theme.colors.semantic.error,
    backgroundColor: 'transparent',
    marginTop: 16,
  },
  signOutButtonContent: {
    paddingVertical: 10,
  },
  signOutButtonLabel: {
    color: theme.colors.semantic.error,
    fontSize: 14,
  },
  signOutDialog: {
    backgroundColor: theme.colors.neutral.white,
    alignItems: 'center',
  },
  dialogActionStyle: {
    borderRadius: 14,
    borderColor: theme.colors.primary,
    flexGrow: 1,
  },
  dialogActionContentStyle: {
    paddingHorizontal: 24,
  },
  dialogActionLabelStyle: {},
  upcomingClasses: {
    marginTop: 24,
    marginBottom: 6,
  },
  upcomingClassesTitle: {
    color: theme.colors.neutral.black,
    fontSize: 22,
    marginBottom: 16,
  },
  upcommingClass: {
    padding: 24,
    marginVertical: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 32,
  },
  upcommingClassTitle: {
    color: theme.colors.neutral.white,
    fontSize: 16,
    marginBottom: 24,
  },
  upcomingClassAttribute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  upcomingClassAttributeIcon: {
    marginRight: 8,
    width: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upcomingClassAttributeText: {
    color: theme.colors.neutral.white,
    fontSize: 13,
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
});

export default styles;
